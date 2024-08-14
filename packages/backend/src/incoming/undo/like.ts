import db from '../../utils/database.js';

export default async function IUndoLike(body) {
	if (new URL(body.object.object).pathname.startsWith('/notes')) {
		let grabbedLike = await db.getRepository('note_like').findOne({
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
			let grabbedReact = await db.getRepository('note_react').findOne({
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
