import ApiMeta from '../constructors/meta.js';
import ApiNotification from '../constructors/notification.js';
import db from '../utils/database.js';

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

		return {
			status: 200,
			notification: new ApiNotification(
				grabbedNotification,
				grabbedTo,
				grabbedFrom,
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
