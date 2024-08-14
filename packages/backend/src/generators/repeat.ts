import ApiRepeat from '../constructors/repeat.js';
import db from '../utils/database.js';
import generateNote from './note.js';

export default async function generateRepeat(grabbedRepeat): Promise<{
	status?: number;
	repeat?: ApiRepeat;
	message?: string;
}> {
	if (grabbedRepeat) {
		let grabbedAuthor = await db
			.getRepository('user')
			.createQueryBuilder()
			.where({ id: grabbedRepeat.author })
			.getOne();

		if (grabbedAuthor) {
			if (grabbedAuthor.suspended) {
				return {
					status: 404,
					message: 'Repeat author suspended'
				};
			} else if (grabbedAuthor.deactivated) {
				return {
					status: 404,
					message: 'Repeat author deactivated'
				};
			} else {
				let grabbedNote = await db
					.getRepository('note')
					.createQueryBuilder()
					.where({ id: grabbedRepeat.note })
					.getOne();

				let generatedNote = await generateNote(grabbedNote);

				return {
					status: 200,
					repeat: new ApiRepeat(
						grabbedRepeat,
						generatedNote.note,
						grabbedAuthor
					)
				};
			}
		} else {
			return {
				status: 404,
				message: 'Repeat author not found'
			};
		}
	} else {
		return {
			status: 404,
			message: 'Repeat not found'
		};
	}
}
