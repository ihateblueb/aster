import { ObjectLiteral } from 'typeorm';

import context from '../../static/context.js';
import DriveService from '../DriveService.js';
import MfmService from '../MfmService.js';
import UserService from '../UserService.js';
import ApDocumentRenderer from './ApDocumentRenderer.js';
import ApVisibilityService from './ApVisibilityService.js';

class ApNoteRenderer {
	public async render(note: ObjectLiteral): Promise<ApObject> {
		let apNote = {
			'@context': context,

			type: 'Note',
			id: note.apId,

			actor: note.user.apId,
			attributedTo: note.user.apId,

			sensitive: Boolean(note.cw),

			summary: note.cw,
			_misskey_summary: note.cw,
			content: note.content,
			_misskey_content: note.content,

			attachment: [],
			tag: [],

			published: note.createdAt,

			visibility: note.visibility,
			to: [],
			cc: []
		};

		if (note.replyingTo) {
			apNote['inReplyTo'] = note.replyingTo.apId;
		}

		if (note.repeat) {
			apNote['quoteUrl'] = note.repeat.apId;
			apNote['quoteUri'] = note.repeat.apId;
			apNote['_misskey_quote'] = note.repeat.apId;
		}

		let mentions = MfmService.extractMentions(note.content);

		for (let mention of mentions) {
			let splitHandle = mention.split('@');

			let where = {
				username: splitHandle[1]
			};

			if (splitHandle[2]) where['host'] = splitHandle[2];
			if (!splitHandle[2]) where['local'] = true;

			let user = await UserService.get(where);

			if (user)
				apNote.tag.push({
					type: 'Mention',
					name: mention,
					href: user.apId
				});
		}

		if (note.attachments) {
			for (let attachment of note.attachments) {
				let file = await DriveService.get({ id: attachment });

				if (file)
					apNote.attachment.push(
						ApDocumentRenderer.render(
							file.src,
							file.type,
							file.alt,
							file.sensitive
						)
					);
			}
		}

		const { to, cc } = await ApVisibilityService.render(note.user.id, note);

		apNote.to = to;
		apNote.cc = cc;

		return apNote;
	}
}

export default new ApNoteRenderer();
