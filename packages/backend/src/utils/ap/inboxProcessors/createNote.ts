import logger from '../../logger.js';
import getRemoteActor from '../getRemoteActor.js';

export default async function processNote(parsedBody) {
	let grabbedRemoteActor = await getRemoteActor(parsedBody.actor);

	// create note with replying_to
	//var noteToInsert = {};
	// this will be generated
	//noteToInsert['id'] = uuidv4();
	//noteToInsert['created_at'] = parsedBody.object.published;
	/*
		DETERMINING VISIBILITY IS HARD AND SUCKS...
	*/
	//await db.getRepository('notes').insert(noteToInsert);
	//logger('info', 'ap', 'created note ' + noteToInsert.id);
	// add noteid to replies in the original note

	// default to direct to not leak dms
	let visibility;
	visibility = 'direct';

	// aster:Visibility extension
	if (parsedBody.object.visibility) {
		/*
			not directly
			visibility = parsedBody.object.visibility
			because it could have other stuff
		*/
		if (parsedBody.object.visibility === 'public') {
			visibility = 'public';
		} else if (parsedBody.object.visibility === 'unlisted') {
			visibility = 'unlisted';
		} else if (parsedBody.object.visibility === 'followers') {
			visibility = 'followers';
		} else if (parsedBody.object.visibility === 'direct') {
			visibility = 'direct';
		}
	}

	if (parsedBody.object.directMessage) {
		visibility = 'direct';
	}

	if (parsedBody.object.to.includes(grabbedRemoteActor.followers_url)) {
		visibility = 'followers';
	}

	if (
		parsedBody.object.cc.includes(
			'https://www.w3.org/ns/activitystreams#Public'
		) &&
		parsedBody.object.to.includes(grabbedRemoteActor.followers_url)
	) {
		visibility = 'unlisted';
	}

	if (
		parsedBody.object.to.includes(
			'https://www.w3.org/ns/activitystreams#Public'
		)
	) {
		visibility = 'public';
	}

	logger('debug', 'ap', `MEOWWMWMROE MEOW the visibility is ${visibility}`);
}
