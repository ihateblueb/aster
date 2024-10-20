import * as uuid from 'uuid';

import NoteService from '../../../built/services/NoteService.js';
import db from '../../utils/database.js';
import logger from '../../utils/logger.js';
import UserService from '../UserService.js';
import ApActorService from './ApActorService.js';
import ApResolver from './ApResolver.js';
import ApValidationService from './ApValidationService.js';

class ApNoteService {
	public async get(apId: string) {
		let url = new URL(apId);

		let actor = await UserService.get({ apId: apId });
		if (actor) return actor;

		let resolvedNote = await ApResolver.resolveSigned(apId);

		if (!resolvedNote) return false;
		if ((await resolvedNote.json()).type !== 'Note') return false;

		return await this.register(await resolvedNote.json());
	}

	public async register(body) {
		if (!ApValidationService.validBody(body)) return false;

		console.log(body); //todo: remove

		const id = uuid.v7();

		let note = {
			id: id,
			apId: body.id,
			local: false
		};

		let author = await ApActorService.get(
			body.attributedTo ? body.attributedTo : body.actor
		);
		if (!author) return false;
		note['userId'] = author.id;

		note['createdAt'] = body.published
			? new Date(body.published).toISOString()
			: new Date().toISOString();

		if (body.summary) note['cw'] = body.summary;

		if (body.content) note['content'] = body.content;
		if (body._misskey_content) note['content'] = body._misskey_content;
		if (body.source.content) note['content'] = body.source.content;

		if (
			body.visibility &&
			['public', 'unlisted', 'followers', 'direct'].includes(
				body.visibility
			)
		)
			note['visibility'] = body.visibility;

		if (body.to.includes(author.followersUrl))
			note['visibility'] = 'followers';

		if (
			body.cc.includes('https://www.w3.org/ns/activitystreams#Public') &&
			body.to.includes(author.followersUrl)
		)
			note['visibility'] = 'unlisted';

		if (body.to.includes('https://www.w3.org/ns/activitystreams#Public'))
			note['visibility'] = 'public';

		console.log(note); //todo: remove

		/*
		await db
			.getRepository('note')
			.insert(note)
			.catch((err) => {
				console.log(err);
				logger.error('ap', 'failed to insert remote note');
			});
		*/

		return await NoteService.get({ id: id });
	}
}

export default new ApNoteService();
