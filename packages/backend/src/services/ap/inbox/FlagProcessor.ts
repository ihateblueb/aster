import NoteService from '../../NoteService.js';
import ReportService from '../../ReportService.js';
import UserService from '../../UserService.js';

class FlagProcessor {
	public async process(body: ApObject): Promise<boolean> {
		if (!body.object) return false;

		const actor = await UserService.get({ apId: body.actor ?? undefined });

		const user = await UserService.get({ apId: body.object });
		const note = await NoteService.get({ apId: body.object });

		if (!user && !note) return false;

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
