import signAndAccept from '../../utils/ap/accept.js';
import db from '../../utils/database.js';
import logger from '../../utils/logger.js';
import getRemoteActor from '../../utils/ap/getRemoteActor.js';

export default async function IUndoLike(body) {
	if (new URL(body.object.object).pathname.startsWith('/notes')) {
		var grabbedLike = await db.getRepository('note_like').findOne({
			where: {
				ap_id: body.object.id
			}
		});

		if (grabbedLike) {
			await db.getRepository('note_like').delete({
				ap_id: body.object.id
			});

			return {
				status: 200,
				message: 'Undo like accepted'
			};
		} else {
			var grabbedReact = await db.getRepository('note_react').findOne({
				where: {
					ap_id: body.object.id
				}
			});

			if (grabbedReact) {
				await db.getRepository('note_react').delete({
					ap_id: body.object.id
				});

				return {
					status: 200,
					message: 'Undo like accepted'
				};
			} else {
				return {
					status: 400,
					message: "Like doesn't exist"
				};
			}
		}
	} else {
		return {
			status: 400,
			message: 'Object is not a note'
		};
	}
}
