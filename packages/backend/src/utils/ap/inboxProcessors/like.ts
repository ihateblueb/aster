import createNotification from '../../createNotification.js';
import db from '../../database.js';
import getRemoteActor from '../getRemoteActor.js';
import getRemoteEmoji from '../getRemoteEmoji.js';
import { v4 as uuidv4 } from 'uuid';

export default async function IPLike(body) {
	if (body.object) {
		if (new URL(body.object).pathname.startsWith('/notes')) {
			var grabbedNote = await db.getRepository('note').findOne({
				where: {
					id: new URL(body.object).pathname.replace('/notes/', '')
				}
			});
			if (grabbedNote) {
				var grabbedRemoteUser = await getRemoteActor(body.actor);

				if (body.content) {
					// this is a reaction, not a like

					var reactionEmoji = body.tag.find(
						(e) => e.name === body.content
					);

					var grabbedEmoji = await getRemoteEmoji(reactionEmoji.id);

					await db.getRepository('notes_react').insert({
						id: uuidv4(),
						ap_id: grabbedEmoji.ap_id,
						note: new URL(body.object).pathname.replace(
							'/notes/',
							''
						),
						created_at: new Date(Date.now()).toISOString(),
						emoji: grabbedEmoji.id,
						user: grabbedRemoteUser.id
					});

					await createNotification(
						grabbedNote.author,
						grabbedRemoteUser.id,
						'react',
						grabbedNote.id,
						grabbedEmoji.id
					);
				} else {
					await db.getRepository('notes_like').insert({
						id: uuidv4(),
						ap_id: body.id,
						note: new URL(body.object).pathname.replace(
							'/notes/',
							''
						),
						created_at: new Date(Date.now()).toISOString(),
						user: grabbedRemoteUser.id
					});
					await createNotification(
						grabbedNote.author,
						grabbedRemoteUser.id,
						'like',
						grabbedNote.id
					);
				}
				return {
					status: 200
				};
			} else {
				return {
					status: 404,
					message: "Note doesn't exist"
				};
			}
		} else {
			return {
				status: 400,
				message: 'Object is not a note'
			};
		}
	} else {
		return {
			status: 400,
			message: 'No object specified'
		};
	}
}
