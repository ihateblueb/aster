import { v4 as uuidv4 } from 'uuid';

import db from '../utils/database.js';

type notificationType =
	| 'mention'
	| 'reply'
	| 'note'
	| 'react'
	| 'like'
	| 'repeat'
	| 'pollEnd'
	| 'note'
	| 'follow'
	| 'followrequest'
	| 'bite';

class Notification {
	public async create(
		to: string,
		from: string,
		type: notificationType,
		object?: object,
		reaction?: object
	) {
		let notificationToInsert = {};

		notificationToInsert['id'] = uuidv4();
		notificationToInsert['to'] = to;
		notificationToInsert['from'] = from;

		notificationToInsert['type'] = type;

		notificationToInsert['created_at'] = new Date(Date.now()).toISOString();
		notificationToInsert['object'] = object;
		notificationToInsert['reaction'] = reaction;

		if (to !== from) {
			await db
				.getRepository('user_notification')
				.insert(notificationToInsert);
		}
	}

	public async delete(id: string) {
		await db.getRepository('user_notification').delete({
			id: id
		});
	}
}

export default new Notification();
