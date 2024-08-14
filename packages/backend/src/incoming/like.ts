import createNotification from '../utils/actions/createNotification.js';
import db from '../utils/database.js';
import getRemoteActor from '../utils/ap/getRemoteActor.js';
import getRemoteEmoji from '../utils/ap/getRemoteEmoji.js';
import { v4 as uuidv4 } from 'uuid';

export default async function ILike(body) {
	// TODO: add duplicate checking
	if (body.object) {
		if (new URL(body.object).pathname.startsWith('/notes')) {
			let grabbedNote = await db.getRepository('note').findOne({
				where: {
					id: new URL(body.object).pathname.replace('/notes/', '')
				}
			});
			if (grabbedNote) {
				let grabbedRemoteUser = await getRemoteActor(body.actor);

				if (body.content) {
					// this is a reaction, not a like

					if (body.tag) {
						let reactionEmoji = body.tag.find(
							(e) => e.name === body.content
						);
						let grabbedEmoji = await getRemoteEmoji(
							reactionEmoji ? reactionEmoji.id : body.content
						);

						await db.getRepository('note_react').insert({
							id: uuidv4(),
							ap_id: body.id,
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
						return {
							status: 200
						};
					} else {
						await db.getRepository('note_like').insert({
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
					await db.getRepository('note_like').insert({
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
