import db from '../database.js';
import logger from '../logger.js';
import sanitize from '../sanitize.js';
import getRemoteActor from './getRemoteActor.js';
import getRemoteNote from './getRemoteNote.js';
import { v4 as uuidv4 } from 'uuid';

export default async function processNewNote(body) {
	if (body.type === 'Note') {
		let grabbedRemoteActor = await getRemoteActor(body.attributedTo);

		let noteToInsert = {
			id: ''
		};

		const noteId = uuidv4();

		noteToInsert['id'] = noteId;
		noteToInsert['ap_id'] = body.id;
		noteToInsert['created_at'] = body.published;

		// default to direct to not leak dms
		let visibility;
		visibility = 'direct';

		/*
			Theres a problem here with replies I believe
		*/

		// aster:Visibility extension
		if (body.visibility) {
			/*
				not directly
				visibility = body.visibility
				because it could have other stuff
			*/
			if (body.visibility === 'public') {
				visibility = 'public';
			} else if (body.visibility === 'unlisted') {
				visibility = 'unlisted';
			} else if (body.visibility === 'followers') {
				visibility = 'followers';
			} else if (body.visibility === 'direct') {
				visibility = 'direct';
			}
		}

		if (body.directMessage) {
			visibility = 'direct';
		}

		if (body.to.includes(grabbedRemoteActor.followers_url)) {
			visibility = 'followers';
		}

		if (
			body.cc.includes('https://www.w3.org/ns/activitystreams#Public') &&
			body.to.includes(grabbedRemoteActor.followers_url)
		) {
			visibility = 'unlisted';
		}

		if (body.to.includes('https://www.w3.org/ns/activitystreams#Public')) {
			visibility = 'public';
		}

		noteToInsert['visibility'] = visibility;

		if (body.inReplyTo) {
			/*
				not doing this rn but i will later
				this should have to filter out the author and the authors followers
				rn this will crash when this sees a follower id and tries
				fetching it like a regualr actor. 
			*/
			let getReplyingTo = await getRemoteActor(body.to[1]);
			let replyingToNote = await getRemoteNote(
				body.inReplyTo,
				getReplyingTo.id
			);
			noteToInsert['replying_to'] = replyingToNote.id;
		}

		noteToInsert['author'] = grabbedRemoteActor.id;
		noteToInsert['local'] = false;

		if (body.subject) {
			noteToInsert['cw'] = sanitize(body.subject);
		}

		if (
			body.source &&
			body.source.content &&
			body.source.mediaType === 'text/x.misskeymarkdown'
		) {
			// raw mfm
			noteToInsert['content'] = sanitize(body.source.content);
		} else {
			noteToInsert['content'] = sanitize(body.content);
		}

		await db.getRepository('notes').insert(noteToInsert);

		logger('info', 'ap', 'created remote note ' + body.id);

		return noteToInsert;
	}
}
