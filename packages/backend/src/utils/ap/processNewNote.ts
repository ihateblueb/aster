import db from '../database.js';
import logger from '../logger.js';
import sanitize from '../sanitize.js';
import getRemoteActor from './getRemoteActor.js';
import getRemoteNote from './getRemoteNote.js';
import { v4 as uuidv4 } from 'uuid';

export default async function processNewNote(body) {
	if (body.object.type === 'Note') {
		let grabbedRemoteActor = await getRemoteActor(body.object.actor);

		let noteToInsert = {};

		const noteId = uuidv4();

		noteToInsert['id'] = noteId;
		noteToInsert['ap_id'] = body.object.id;
		noteToInsert['created_at'] = body.object.published;

		// default to direct to not leak dms
		let visibility;
		visibility = 'direct';

		// aster:Visibility extension
		if (body.object.visibility) {
			/*
				not directly
				visibility = body.object.visibility
				because it could have other stuff
			*/
			if (body.object.visibility === 'public') {
				visibility = 'public';
			} else if (body.object.visibility === 'unlisted') {
				visibility = 'unlisted';
			} else if (body.object.visibility === 'followers') {
				visibility = 'followers';
			} else if (body.object.visibility === 'direct') {
				visibility = 'direct';
			}
		}

		if (body.object.directMessage) {
			visibility = 'direct';
		}

		if (body.object.to.includes(grabbedRemoteActor.followers_url)) {
			visibility = 'followers';
		}

		if (
			body.object.cc.includes(
				'https://www.w3.org/ns/activitystreams#Public'
			) &&
			body.object.to.includes(grabbedRemoteActor.followers_url)
		) {
			visibility = 'unlisted';
		}

		if (
			body.object.to.includes(
				'https://www.w3.org/ns/activitystreams#Public'
			)
		) {
			visibility = 'public';
		}

		noteToInsert['visibility'] = visibility;

		if (body.object.inReplyTo) {
			let getReplyingTo = await getRemoteActor(body.object.to[1]);
			let replyingToNote = await getRemoteNote(
				body.object.inReplyTo,
				getReplyingTo.id
			);
			noteToInsert['replying_to'] = replyingToNote.id;
		}

		noteToInsert['author'] = grabbedRemoteActor.id;
		noteToInsert['local'] = false;

		if (body.object.subject) {
			noteToInsert['cw'] = sanitize(body.object.subject);
		}

		if (
			body.object.source &&
			body.object.source.content &&
			body.object.source.mediaType === 'text/x.misskeymarkdown'
		) {
			// raw mfm
			noteToInsert['content'] = sanitize(body.object.source.content);
		} else {
			noteToInsert['content'] = sanitize(body.object.content);
		}

		await db.getRepository('notes').insert(noteToInsert);

		logger('info', 'ap', 'created remote note ' + body.object.id);

		return noteToInsert;
	}
}
