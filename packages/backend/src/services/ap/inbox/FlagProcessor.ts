import logger from '../../../utils/logger';
import NoteService from '../../NoteService';
import ReportService from '../../ReportService';
import UserService from '../../UserService';

class FlagProcessor {
	public async process(body: ApObject): Promise<boolean> {
		if (!body.object) return false;

		const actor = await UserService.get({ apId: body.actor ?? undefined });

		const user = await UserService.get({ apId: body.object });
		const note = await NoteService.get({ apId: body.object });

		return await ReportService.create(
			actor.id,
			body.summary ?? undefined,
			user ? user.id : undefined,
			note ? note.id : undefined,
			body.id
		).then(() => {
			return true;
		});
	}
}

export default new FlagProcessor();
