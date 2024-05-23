import db from '../database.js';
import logger from '../logger.js';
import getRemoteActor from './getRemoteActor.js';
import accept from './accept.js';
import { Users } from '../../entities/User.js';

/*
	Done activity types:
	Todo activity types:

	Accept
	Announce
	Create
	Follow
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
	} else if (parsedBody.type === 'Create') {
		// create
	} else if (parsedBody.type === 'Delete') {
		let grabbedRemoteActorDb = await db.getRepository('users').find({
			where: {
				ap_id: parsedBody.actor
			}
		});

		let grabbedRemoteActor = grabbedRemoteActorDb[0];

		if (grabbedRemoteActor) {
			await db.getRepository('users').delete(grabbedRemoteActor.id);
			logger('info', 'ap', 'deleted ' + parsedBody.actor);
			return {
				status: 200,
				message: 'actor deleted'
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
				message: 'pretended to delete actor'
			};
		}
	} else if (parsedBody.type === 'Follow') {
		let grabbedLocalUserDb = await db.getRepository('users').find({
			where: {
				ap_id: parsedBody.object
			}
		});

		let grabbedLocalUser = grabbedLocalUserDb[0];

		if (!grabbedLocalUser) {
			logger('debug', 'ap', 'local user not here');
		}

		if (!grabbedLocalUser.local) {
			return {
				status: '400',
				message: 'user is not local'
			};
		}

		let grabbedRemoteActor = await getRemoteActor(parsedBody.actor);

		if (grabbedLocalUser.locked) {
			// this will have to add them to the pending follower array and wait to be moved
			return {
				status: '501',
				message: 'not implemented'
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
		// undo
	} else if (parsedBody.type === 'Like') {
		// like
	} else if (parsedBody.type === 'EmojiReact') {
		// emoji react
	} else if (parsedBody.type === 'Add') {
		// add
	} else if (parsedBody.type === 'Block') {
		// block
	} else if (parsedBody.type === 'Move') {
		// this will not be implemented
		return {
			status: 501,
			message: 'not implemented'
		};
	}
}
