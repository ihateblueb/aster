import logger from '../../../utils/logger.js';
import NoteService from '../../NoteService.js';
import UserService from '../../UserService.js';

class DeleteProcessor {
	private async findAndDelete(as: string, apId: string): Promise<boolean> {
		let actor = await UserService.get({ apId: as });
		if (!actor) return false;

		let user = await UserService.get({ apId: apId });
		if (user && actor.host === user.host) {
			logger.debug('delete', 'deleting user');
			await UserService.delete({ apId: apId });
			return true;
		}

		let note = await NoteService.get({ apId: apId });
		if (note && note.user && note.user.host === actor.host) {
			logger.debug('delete', 'deleting note');
			await NoteService.delete({ apId: apId });
			return true;
		}

		return false;
	}

	public async process(body): Promise<boolean> {
		if (!body.actor) return false;
		if (!body.object) return false;

		if (!body.object.type) {
			return await this.findAndDelete(body.actor, body.object);
		} else {
			return await this.findAndDelete(body.actor, body.object.id);
		}
	}
}

export default new DeleteProcessor();
