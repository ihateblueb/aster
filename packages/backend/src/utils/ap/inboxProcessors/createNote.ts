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

	// aster:Visibility
	if (parsedBody.object.visibility) {
		/*
			not directly
			visibility = parsedBody.object.visibility
			because it could have other stuff.
		*/
		if (parsedBody.object.visibility === 'public') {
			var visibility = 'public';
		} else if (parsedBody.object.visibility === 'unlisted') {
			var visibility = 'unlisted';
		} else if (parsedBody.object.visibility === 'followers') {
			var visibility = 'followers';
		} else if (parsedBody.object.visibility === 'direct') {
			var visibility = 'direct';
		}
	}

	if (parsedBody.object.directMessage) {
		var visibility = 'direct';
	}

	logger('debug', 'ap', `MEOWWMWMROE MEOW the visibility is ${visibility}`);
}
