import ApiNote from '../constructors/note.js';
import db from '../utils/database.js';

export default async function generateNote(grabbedNote): Promise<{
	status?: number;
	note?: ApiNote;
	message?: string;
}> {
	if (grabbedNote) {
		let grabbedAuthor = await db
			.getRepository('user')
			.createQueryBuilder()
			.where({ id: grabbedNote.author })
			.getOne();

		if (grabbedAuthor) {
			if (grabbedAuthor.suspended) {
				return {
					status: 404,
					message: 'Note author suspended'
				};
			} else if (grabbedAuthor.deactivated) {
				return {
					status: 404,
					message: 'Note author deactivated'
				};
			} else {
				let grabbedInstance = await db
					.getRepository('instance')
					.createQueryBuilder()
					.where({ host: grabbedAuthor.host })
					.getOne();

				let grabbedReplyingNote;

				if (grabbedNote.replying_to) {
					grabbedReplyingNote = await db
						.getRepository('note')
						.createQueryBuilder()
						.where({ id: grabbedNote.replying_to })
						.getOne();
				}

				let grabbedAttachments = await db
					.getRepository('drive_file')
					.createQueryBuilder()
					.where({
						note: grabbedNote.id
					})
					.getMany();

				let grabbedEmojis = [];

				if (grabbedNote.emojis) {
					grabbedNote.emojis.forEach(async (emoji) => {
						let grabbedEmoji = await db
							.getRepository('emoji')
							.createQueryBuilder()
							.where({
								id: emoji
							})
							.getOne();

						grabbedEmojis.push(grabbedEmoji);
					});
				}

				let grabbedReactions = await db
					.getRepository('note_react')
					.createQueryBuilder('note_react')
					.leftJoinAndSelect('note_react.emoji', 'emoji')
					.where('note_react.note = :note', {
						note: grabbedNote.id
					})
					.getMany();

				let grabbedLikes = await db.getRepository('note_like').find({
					where: {
						note: grabbedNote.id
					}
				});

				let grabbedRepeats = await db.getRepository('repeat').find({
					where: {
						note: grabbedNote.id
					}
				});

				return {
					status: 200,
					note: new ApiNote(
						grabbedNote,
						grabbedAuthor,
						grabbedInstance,
						(await generateNote(grabbedReplyingNote)).note,
						grabbedAttachments,
						grabbedEmojis,
						grabbedReactions,
						grabbedLikes,
						grabbedRepeats
					)
				};
			}
		} else {
			return {
				status: 404,
				message: 'Note author not found'
			};
		}
	} else {
		return {
			status: 404,
			message: 'Note not found'
		};
	}
}
