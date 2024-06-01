import db from '../database.js';
import logger from '../logger.js';
import accept from '../ap/accept.js';
import getRemoteActor from './getRemoteActor.js';

import processNewNote from './processNewNote.js';

/*
	Done activity types:

	Follow
	- without approval
	Undo
	- follow

	Todo activity types:

	Accept
	Announce
	Create
	Follow
	- with approval
	Update
	Undo
	Like
	EmojiReact
	Add
	Block
	Move

	Activities to ignore:

	CacheFile
	View
*/

export default async function acceptInboxRequest(parsedBody) {
	logger('debug', 'ap', 'activity of type ' + parsedBody.type + ' received');

	if (parsedBody.type === 'Accept') {
		// accept
	} else if (parsedBody.type === 'Announce') {
		// announce
	} else if (parsedBody.type === 'Bite') {
		// YEEEOWWWCH!
		// https://ns.mia.jetzt/as/#Bite
	} else if (parsedBody.type === 'Create') {
		if (parsedBody.object.type === 'Note') {
			await processNewNote(parsedBody.object);
		}
	} else if (parsedBody.type === 'Delete') {
		// disabled because this deletes actor no matter what even though it could be a deleted note
		/*

		let grabbedRemoteActor = await db.getRepository('users').findOne({
			where: {
				ap_id: parsedBody.actor
			}
		});

		if (grabbedRemoteActor) {
			await db.getRepository('users').delete(grabbedRemoteActor.id);
			logger('info', 'ap', 'deleted ' + parsedBody.actor);
			return {
				status: 200,
				message: 'Actor deleted'
			};
		} else {
			logger(
				'debug',
				'ap',
				'accepted deletion of ' +
					parsedBody.actor +
					' even though it was not present'
			);
			return {
				status: 200,
				message: 'Pretended to delete actor'
			};
		}
		*/
	} else if (parsedBody.type === 'Follow') {
		let grabbedLocalUser = await db.getRepository('users').findOne({
			where: {
				ap_id: parsedBody.object
			}
		});

		if (!grabbedLocalUser) {
			logger('debug', 'ap', 'local user not here');
		}

		if (!grabbedLocalUser.local) {
			return {
				status: '400',
				message: 'User is not local'
			};
		}

		let grabbedRemoteActor = await getRemoteActor(parsedBody.actor);

		if (grabbedLocalUser.locked) {
			await db
				.getRepository('users')
				.query(
					`UPDATE "users" SET "pending_followers" = array_append("pending_followers", '${grabbedRemoteActor.ap_id}') WHERE "id" = '${grabbedLocalUser.id}'`
				);
			return {
				status: 200,
				message: 'Added pending follower'
			};
		} else {
			await db
				.getRepository('users')
				.query(
					`UPDATE "users" SET "followers" = array_append("followers", '${grabbedRemoteActor.ap_id}') WHERE "id" = '${grabbedLocalUser.id}'`
				);

			accept(grabbedLocalUser.id, grabbedRemoteActor.inbox, parsedBody);
		}
	} else if (parsedBody.type === 'Update') {
		// update
	} else if (parsedBody.type === 'Undo') {
		let grabbedLocalUser = await db.getRepository('users').findOne({
			where: {
				ap_id: parsedBody.object.object
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

		let grabbedRemoteActor = await getRemoteActor(parsedBody.actor);

		if (parsedBody.object.type === 'Follow') {
			await db
				.getRepository('users')
				.query(
					`UPDATE "users" SET "followers" = array_remove("followers", '${grabbedRemoteActor.ap_id}') WHERE "id" = '${grabbedLocalUser.id}'`
				);

			accept(grabbedLocalUser.id, grabbedRemoteActor.inbox, parsedBody);

			return {
				status: 200,
				message: 'Undo follow accepted'
			};
		} else {
			return;
		}
	} else if (parsedBody.type === 'Like') {
		console.log(parsedBody);
	} else if (parsedBody.type === 'EmojiReact') {
		console.log(parsedBody);
	} else if (parsedBody.type === 'Add') {
		// add
	} else if (parsedBody.type === 'Block') {
		// block
	} else if (parsedBody.type === 'Move') {
		// this will not be implemented
		return {
			status: 501,
			message: 'Not implemented'
		};
	} else {
		console.log('oh god oh fuck new activity type ' + parsedBody.type);
	}
}
