import punycode from 'node:punycode';

import { In } from 'typeorm';

import config from '../../utils/config.js';
import db from '../../utils/database.js';
import logger from '../../utils/logger.js';
import reduceSubdomain from '../../utils/reduceSubdomain.js';
import IdService from '../IdService.js';
import SanitizerService from '../SanitizerService.js';
import UserService from '../UserService.js';
import WebsocketService from '../WebsocketService.js';
import NoteService from './../NoteService.js';
import ApActorService from './ApActorService.js';
import ApResolver from './ApResolver.js';
import ApValidationService from './ApValidationService.js';
import ApVisibilityService from './ApVisibilityService.js';

class ApNoteService {
	public async get(apId: ApId, as?: GenericId) {
		const url = new URL(apId);

		// why is this here? this is for notes
		//const actor = await UserService.get({ apId: apId });
		//if (actor) return actor;

		const existingNote = await NoteService.get({ apId: apId });
		if (existingNote) return existingNote;

		const resolvedNote = await ApResolver.resolveSigned(apId, as);

		if (!resolvedNote) return false;
		if (resolvedNote.type !== 'Note') return false;

		return await this.register(resolvedNote);
	}

	public async register(body) {
		if (!ApValidationService.validBody(body)) return false;

		console.log(body); //todo: remove

		const id = IdService.generate();

		const note = {
			id: id,
			apId: SanitizerService.sanitize(body.id),
			local: false
		};

		const author = await ApActorService.get(
			body.attributedTo ?? body.actor
		);
		if (!author) return false;
		note['userId'] = author.id;

		const moderatedInstance = await db
			.getRepository('moderated_instance')
			.findOne({
				where: {
					host: punycode.toASCII(reduceSubdomain(author.host))
				}
			});

		note['createdAt'] = body.published
			? new Date(body.published).toISOString()
			: new Date().toISOString();

		const determinedVisibility = await ApVisibilityService.determine(body);

		note['visibility'] = determinedVisibility.visibility;
		note['to'] = determinedVisibility.to;

		let getRelatedNotesAs;
		if (determinedVisibility.to)
			getRelatedNotesAs = await UserService.get({
				id: In(determinedVisibility.to),
				local: true
			});

		let replyingTo;

		if (body.inReplyTo)
			replyingTo = await this.get(
				body.inReplyTo,
				getRelatedNotesAs ? getRelatedNotesAs.id : undefined
			);

		if (replyingTo) note['replyingToId'] = replyingTo.id;

		let quote;

		if (body.quoteUrl)
			quote = await this.get(
				body.quoteUrl,
				getRelatedNotesAs ? getRelatedNotesAs.id : undefined
			);
		if (body.quoteUri)
			quote = await this.get(
				body.quoteUri,
				getRelatedNotesAs ? getRelatedNotesAs.id : undefined
			);
		if (body._misskey_quote)
			quote = await this.get(
				body._misskey_quote,
				getRelatedNotesAs ? getRelatedNotesAs.id : undefined
			);

		if (quote) note['repeatId'] = quote.id;

		if (body.summary) note['cw'] = SanitizerService.sanitize(body.summary);
		if (body._misskey_summary)
			note['cw'] = SanitizerService.sanitize(body._misskey_summary);

		if (moderatedInstance && moderatedInstance.cw && !note['cw'])
			note['cw'] = moderatedInstance.cw;

		if (body.content)
			note['content'] = SanitizerService.sanitize(body.content);
		if (body.source && body.source.content)
			note['content'] = SanitizerService.sanitize(body.source.content);
		if (body._misskey_content)
			note['content'] = SanitizerService.sanitize(body._misskey_content);

		console.log(note); //todo: remove

		await db
			.getRepository('note')
			.insert(note)
			.catch((err) => {
				console.log(err);
				logger.error('ap', 'failed to insert remote note');
			});

		const grabbedNote = await NoteService.get({ id: id });

		if (
			config.bubbleTimeline &&
			config.bubbleInstances.includes(author.host)
		) {
			WebsocketService.globalEmitter.emit('timeline:bubble', {
				type: 'timeline:add',
				timeline: 'bubble',
				note: grabbedNote
			});
		}

		WebsocketService.globalEmitter.emit('timeline:global', {
			type: 'timeline:add',
			timeline: 'global',
			note: grabbedNote
		});

		return grabbedNote;
	}
}

export default new ApNoteService();
