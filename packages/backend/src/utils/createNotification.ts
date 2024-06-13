import { v4 as uuidv4 } from 'uuid';

import db from '../utils/database.js';

export default async function createNotification(to, from, type, item?) {
	var notificationToInsert = {};

	notificationToInsert['id'] = uuidv4();
	notificationToInsert['to'] = to;
	notificationToInsert['from'] = from;

	notificationToInsert['type'] = type;
	/*
		followrequest
		follow
	*/

	notificationToInsert['time'] = new Date(Date.now()).toISOString();

	if (item) {
		notificationToInsert['item'] = item;
	}

	await db.getRepository('users_notification').insert(notificationToInsert);
}
