import db from '../database.js';
import logger from '../logger.js';

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
		var grabbedRemoteActorDb = await db.getRepository('users').find({
			where: {
				ap_id: parsedBody.actor
			}
		});

		var grabbedRemoteActor = grabbedRemoteActorDb[0];

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
		var grabbedLocalUserDb = await db.getRepository('users').find({
			where: {
				ap_id: parsedBody.object
			}
		});

		var grabbedLocalUser = grabbedLocalUserDb[0];

		if (!grabbedLocalUser) {
			logger('debug', 'ap', 'local user not here');
		}

		if (grabbedLocalUser.locked) {
			// this will have to add them to the pending follower array and wait to be moved
			return {
				status: '501',
				message: 'not implemented'
			};
		} else {
			// this will have to add them to the follower array, send an accept, and then it's good
			// followers should be stored at their AP ids to minimize sql queries later
			let acceptBody = {};
			return {
				status: '501',
				message: 'not implemented'
			};
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
