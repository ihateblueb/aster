import { v4 as uuidv4 } from 'uuid';

import logger from '../../logger.js';
import getRemoteActor from '../getRemoteActor.js';

export default async function processNote(parsedBody) {
	let grabbedRemoteActor = await getRemoteActor(parsedBody.actor);

	let noteToInsert = {};

	// const originalNoteId
	// how the fuck do i get the note its replying to

	const noteId = uuidv4();

	noteToInsert['id'] = noteId;
	noteToInsert['created_at'] = parsedBody.object.published;

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

	noteToInsert['visibility'] = visibility;

	// id of note above
	//noteToInsert['replying_to'] = sobbing;

	noteToInsert['author'] = grabbedRemoteActor.id;
	noteToInsert['local'] = false;

	if (parsedBody.object.subject) {
		noteToInsert['cw'] = parsedBody.object.subject;
	}

	if (
		parsedBody.object.source &&
		parsedBody.object.source.content &&
		parsedBody.object.source.mediaType === 'text/x.misskeymarkdown'
	) {
		// raw mfm
		noteToInsert['content'] = parsedBody.object.source.content;
	} else {
		noteToInsert['content'] = parsedBody.object.content;
	}

	/*
			await db.getRepository('notes').insert(noteToInsert);

			await db
				.getRepository('notes')
				.query(
					`UPDATE "notes" SET "replies" = array_append("replies", '${originalNoteId}') WHERE "id" = '${noteId}'`
				);
	*/

	logger('debug', 'ap', `MEOWWMWMROE MEOW the visibility is ${visibility}`);
}
