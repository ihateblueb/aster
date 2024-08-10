import ApiMeta from '../constructors/meta.js';
import ApiNotification from '../constructors/notification.js';
import db from '../utils/database.js';

export default async function generateNotification(
	grabbedNotifications
): Promise<{
	status?: number;
	notification?: ApiNotification;
	message?: string;
}> {
	if (grabbedNotifications) {
		const grabbedTo = await db
			.getRepository('user')
			.findOne({ where: { id: grabbedNotifications.to } });

		const grabbedFrom = await db
			.getRepository('user')
			.findOne({ where: { id: grabbedNotifications.from } });

		const grabbedReactions = await db
			.getRepository('note_react')
			.createQueryBuilder('note_react')
			.leftJoinAndSelect('note_react.emoji', 'emoji')
			.where('note_react.note = :note', {
				note: grabbedNotifications.reaction
			})
			.getMany();

		return {
			status: 200,
			notification: new ApiNotification(
				grabbedNotifications,
				grabbedTo,
				grabbedFrom,
				grabbedReactions
			)
		};
	} else {
		return {
			status: 404,
			message: 'Meta not found'
		};
	}
}
