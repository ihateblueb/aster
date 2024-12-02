import db from '../../utils/database.js';
import logger from '../../utils/logger.js';
import IdService from '../IdService.js';
import SanitizerService from '../SanitizerService.js';
import UserService from '../UserService.js';
import NoteService from './../NoteService.js';
import ApActorService from './ApActorService.js';
import ApResolver from './ApResolver.js';
import ApValidationService from './ApValidationService.js';
import ApVisibilityService from './ApVisibilityService.js';

class ApNoteService {
	public async get(apId: string) {
		let url = new URL(apId);

		let actor = await UserService.get({ apId: apId });
		if (actor) return actor;

		let existingNote = await NoteService.get({ apId: apId });
		if (existingNote) return existingNote;

		let resolvedNote = await ApResolver.resolveSigned(apId);

		if (!resolvedNote) return false;
		if ((await resolvedNote.json()).type !== 'Note') return false;

		return await this.register(await resolvedNote.json());
	}

	public async register(body) {
		if (!ApValidationService.validBody(body)) return false;

		console.log(body); //todo: remove

		const id = IdService.generate();

		let note = {
			id: id,
			apId: SanitizerService.sanitize(body.id),
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

		if (body.summary) note['cw'] = SanitizerService.sanitize(body.summary);

		if (body.content)
			note['content'] = SanitizerService.sanitize(body.content);
		if (body._misskey_content)
			note['content'] = SanitizerService.sanitize(body._misskey_content);
		if (body.source && body.source.content)
			note['content'] = SanitizerService.sanitize(body.source.content);

		note['visibility'] = await ApVisibilityService.determine(body);

		console.log(note); //todo: remove

		await db
			.getRepository('note')
			.insert(note)
			.catch((err) => {
				console.log(err);
				logger.error('ap', 'failed to insert remote note');
			});

		return await NoteService.get({ id: id });
	}
}

export default new ApNoteService();
