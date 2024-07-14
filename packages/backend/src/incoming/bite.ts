import createNotification from '../../createNotification.js';
import db from '../../database.js';
import getRemoteActor from '../getRemoteActor.js';
import { create } from 'domain';
import { v4 as uuidv4 } from 'uuid';

export default async function IBite(body) {
	return {
		status: 501,
		message: 'Not implemented'
	};
	// YEEEOWWWCH!
	// https://ns.mia.jetzt/as/#Bite
	if (body.target && body.actor) {
		if (new URL(body.target).pathname.startsWith('/notes')) {
			var grabbedNote = await db
				.getRepository('user')
				.findOne({ where: { ap_id: body.target } });

			var grabbedLocalUser = await db
				.getRepository('user')
				.findOne({ where: { id: grabbedNote.author } });

			var grabbedRemoteUser = await getRemoteActor(body.actor);

			createNotification(
				grabbedLocalUser.id,
				grabbedRemoteUser.id,
				'bite',
				grabbedNote.id
			);
		} else if (new URL(body.target).pathname.startsWith('/users')) {
			var grabbedLocalUser = await db
				.getRepository('user')
				.findOne({ where: { ap_id: body.target } });

			var grabbedRemoteUser = await getRemoteActor(body.actor);

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
