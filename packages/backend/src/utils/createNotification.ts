import { v4 as uuidv4 } from 'uuid';

import db from '../utils/database.js';

export default async function createNotification(
	to,
	from,
	type,
	object?,
	reaction?
) {
	var notificationToInsert = {};

	notificationToInsert['id'] = uuidv4();
	notificationToInsert['to'] = to;
	notificationToInsert['from'] = from;

	notificationToInsert['type'] = type;
	/*
		followrequest
		follow
		like
		react
	*/

	notificationToInsert['time'] = new Date(Date.now()).toISOString();
	notificationToInsert['object'] = object;
	notificationToInsert['reaction'] = reaction;

	await db.getRepository('user_notification').insert(notificationToInsert);
}
