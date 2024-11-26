import logger from '../../../utils/logger.js';
import NoteService from '../../NoteService.js';
import UserService from '../../UserService.js';

class DeleteProcessor {
	private async findAndDelete(apId: string): Promise<boolean> {
		let user = await UserService.get({ apId: apId });
		if (user) {
			logger.debug('delete', 'deleting user');
			await UserService.delete({ apId: apId });
			return true;
		}

		let note = await NoteService.get({ apId: apId });
		if (note) {
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
			return await this.findAndDelete(body.object);
		} else {
			return await this.findAndDelete(body.object.id);
		}
	}
}

export default new DeleteProcessor();
