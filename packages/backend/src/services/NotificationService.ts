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
	| 'bite'
	| 'report'
	| 'severedRelationship'
	| 'userSignup'
	| 'userAwaitingApproval';

class NotificationService {
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

	public async delete(where: object) {
		await db.getRepository('user_notification').delete(where);
	}
}

export default new NotificationService();
