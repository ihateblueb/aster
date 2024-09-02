import ApiNotification from '../constructors/notification.js';
import db from '../utils/database.js';
import generateNote from './note.js';
import ApiUser from '../constructors/user.js';

export default async function generateNotification(
	grabbedNotification
): Promise<{
	status?: number;
	notification?: ApiNotification;
	message?: string;
}> {
	if (grabbedNotification) {
		const grabbedTo = await db
			.getRepository('user')
			.findOne({ where: { id: grabbedNotification.to } });

		const grabbedFrom = await db
			.getRepository('user')
			.findOne({ where: { id: grabbedNotification.from } });

		const grabbedReaction = await db
			.getRepository('emoji')
			.findOne({ where: { id: grabbedNotification.reaction } });

		if (
			grabbedNotification.type === 'note' ||
			grabbedNotification.type === 'mention' ||
			grabbedNotification.type === 'reply' ||
			grabbedNotification.type === 'like' ||
			grabbedNotification.type === 'react' ||
			grabbedNotification.type === 'repeat'
		) {
			let grabbedNote = await db
				.getRepository('note')
				.findOne({ where: { id: grabbedNotification.object } });

			grabbedNotification.object = (await generateNote(grabbedNote)).note;
		}

		return {
			status: 200,
			notification: new ApiNotification(
				grabbedNotification,
				new ApiUser(grabbedTo),
				new ApiUser(grabbedFrom),
				grabbedReaction
			)
		};
	} else {
		return {
			status: 404,
			message: 'Meta not found'
		};
	}
}
