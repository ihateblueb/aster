import signAndAccept from '../../ap/accept.js';
import db from '../../database.js';
import logger from '../../logger.js';
import getRemoteActor from '../getRemoteActor.js';

export default async function IPUndo(body) {
	if (body.object.type === 'Follow') {
		let grabbedLocalUser = await db.getRepository('user').findOne({
			where: {
				ap_id: body.object.object
			}
		});

		if (!grabbedLocalUser) {
			logger('debug', 'ap', 'local user not here');
			return {
				status: '400',
				message: 'User is not here'
			};
		}

		if (!grabbedLocalUser.local) {
			return {
				status: '400',
				message: 'User is not local'
			};
		}

		let grabbedRemoteActor = await getRemoteActor(body.actor);

		await db
			.getRepository('user')
			.query(
				`UPDATE "users" SET "followers" = array_remove("followers", '${grabbedRemoteActor.ap_id}') WHERE "id" = '${grabbedLocalUser.id}'`
			);

		await signAndAccept(
			grabbedLocalUser.id,
			grabbedRemoteActor.inbox,
			body
		);

		return {
			status: 200,
			message: 'Undo follow accepted'
		};
	} else if (body.object.type === 'Like') {
		if (new URL(body.object.object).pathname.startsWith('/notes')) {
			var grabbedNote = await db.getRepository('notes').findOne({
				where: {
					id: new URL(body.object.object).pathname.replace(
						'/notes/',
						''
					)
				}
			});
			if (grabbedNote) {
				if (body.object.content) {
					var emojiReaction = body.object.tag.find(
						(e) => e.name === body.object.content
					);
					await db
						.getRepository('notes_react')
						.delete({ ap_id: emojiReaction.id });
				} else {
					await db
						.getRepository('notes_like')
						.delete({ ap_id: body.object.id });
				}
				return {
					status: 200,
					message: 'Undo like accepted'
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
		return;
	}
}
