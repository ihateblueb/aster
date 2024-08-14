import createNotification from '../utils/actions/createNotification.js';
import db from '../utils/database.js';
import getRemoteActor from '../utils/ap/getRemoteActor.js';

export default async function IBite(body) {
	return {
		status: 501,
		message: 'Not implemented'
	};
	// YEEEOWWWCH!
	// https://ns.mia.jetzt/as/#Bite
	if (body.target && body.actor) {
		if (new URL(body.target).pathname.startsWith('/notes')) {
			let grabbedNote = await db
				.getRepository('user')
				.findOne({ where: { ap_id: body.target } });

			let grabbedLocalUser = await db
				.getRepository('user')
				.findOne({ where: { id: grabbedNote.author } });

			let grabbedRemoteUser = await getRemoteActor(body.actor);

			createNotification(
				grabbedLocalUser.id,
				grabbedRemoteUser.id,
				'bite',
				grabbedNote.id
			);
		} else if (new URL(body.target).pathname.startsWith('/users')) {
			let grabbedLocalUser = await db
				.getRepository('user')
				.findOne({ where: { ap_id: body.target } });

			let grabbedRemoteUser = await getRemoteActor(body.actor);

			createNotification(
				grabbedLocalUser.id,
				grabbedRemoteUser.id,
				'bite'
			);
		}
	} else {
		return {
			status: 400,
			message: 'No target or actor'
		};
	}
}
