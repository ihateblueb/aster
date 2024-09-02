import getRemoteActor from '../utils/ap/getRemoteActor.js';
import getRemoteNote from '../utils/ap/getRemoteNote.js';
import db from '../utils/database.js';
import { v4 as uuidv4 } from 'uuid';
import notification from '../utils/notification.js';

export default async function IAnnounce(body) {
	if (body.actor && body.object) {
		let grabbedActor = await getRemoteActor(body.actor);
		let grabbedNote = await getRemoteNote(body.object);

		if (grabbedActor) {
			if (grabbedNote) {
				const repeatId = uuidv4();

				let repeatToInsert = {};

				repeatToInsert['id'] = repeatId;
				repeatToInsert['ap_id'] = body.id;
				repeatToInsert['created_at'] = new Date(
					Date.now()
				).toISOString();

				let visibility;
				visibility = 'direct';

				// aster:Visibility extension
				if (body.visibility) {
					if (body.visibility === 'public') {
						visibility = 'public';
					} else if (body.visibility === 'unlisted') {
						visibility = 'unlisted';
					} else if (body.visibility === 'followers') {
						visibility = 'followers';
					} else if (body.visibility === 'direct') {
						visibility = 'direct';
					}
				}

				if (body.directMessage) {
					visibility = 'direct';
				}

				if (body.to.includes(grabbedActor.followers_url)) {
					visibility = 'followers';
				}

				if (
					body.cc.includes(
						'https://www.w3.org/ns/activitystreams#Public'
					) &&
					body.to.includes(grabbedActor.followers_url)
				) {
					visibility = 'unlisted';
				}

				if (
					body.to.includes(
						'https://www.w3.org/ns/activitystreams#Public'
					)
				) {
					visibility = 'public';
				}

				repeatToInsert['visibility'] = visibility;

				repeatToInsert['author'] = grabbedActor.id;
				repeatToInsert['local'] = false;
				repeatToInsert['note'] = grabbedNote.id;

				console.log(repeatToInsert);

				await db.getRepository('repeat').insert(repeatToInsert);

				if (
					grabbedNote.local &&
					grabbedActor.id !== grabbedNote.author
				) {
					await notification.create(
						grabbedNote.author,
						grabbedActor.id,
						'repeat',
						grabbedNote.id
					);
				}

				return {
					status: 200,
					message: 'Repeated note'
				};
			} else {
				return {
					status: 404,
					message: 'Note not found'
				};
			}
		} else {
			return {
				status: 500,
				message: 'Unable to fetch actor'
			};
		}
	} else {
		return {
			status: 400,
			message: 'Missing actor or object'
		};
	}
}
