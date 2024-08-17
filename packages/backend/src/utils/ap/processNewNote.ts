import config from '../config.js';
import db from '../database.js';
import Logger from '../logger.js';
import sanitize from '../sanitize.js';
import ingest from '../sonic/ingest.js';
import getRemoteActor from './getRemoteActor.js';
import getRemoteEmoji from './getRemoteEmoji.js';
import getRemoteNote from './getRemoteNote.js';
import processNewEmoji from './processNewEmoji.js';
import processNewFile from './processNewFile.js';
import { v4 as uuidv4 } from 'uuid';

export default async function processNewNote(body) {
	console.log(body);

	if (body.type === 'Note') {
		let grabbedRemoteActor = await getRemoteActor(body.attributedTo);

		let noteToInsert = {
			id: '',
			content: '',
			emojis: [],
			tags: []
		};

		const noteId = uuidv4();

		noteToInsert['id'] = noteId;
		noteToInsert['ap_id'] = sanitize(body.id);
		noteToInsert['created_at'] = sanitize(body.published);

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

				let getReplyingTo = await getRemoteActor(body.to[1]);
				let replyingToNote = await getRemoteNote(
				body.inReplyTo,
				getReplyingTo.id
				);
				noteToInsert['replying_to'] = replyingToNote.id;
			*/

			let replyingToNote = await getRemoteNote(body.inReplyTo);

			if (replyingToNote) {
				noteToInsert['replying_to'] = replyingToNote.id;
			}

			console.log('to');
			console.log(
				body.to.splice(
					body.to.indexOf(
						'https://www.w3.org/ns/activitystreams#Public'
					),
					1
				)
			);
			console.log('cc');
			console.log(body.cc);

			console.log('inReplyTo');
			console.log(body.inReplyTo);
		}

		if (body._misskey_quote) {
			let quotedNote = await getRemoteNote(body._misskey_quote);

			if (quotedNote) {
				noteToInsert['quoted'] = quotedNote.id;
			}
		} else if (body.quoteUrl) {
			let quotedNote = await getRemoteNote(body.quoteUrl);

			if (quotedNote) {
				noteToInsert['quoted'] = quotedNote.id;
			}
		} else if (body.quoteUri) {
			let quotedNote = await getRemoteNote(body.quoteUri);

			if (quotedNote) {
				noteToInsert['quoted'] = quotedNote.id;
			}
		}

		noteToInsert['author'] = grabbedRemoteActor.id;
		noteToInsert['local'] = false;

		if (body.summary) {
			noteToInsert['cw'] = sanitize(body.summary);
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

		if (body.attachment) {
			// media: https://eepy.zone/notes/9vdrkue9efha00mz
			for (const i in body.attachment) {
				await processNewFile(
					body.attachment[i],
					noteToInsert,
					grabbedRemoteActor
				);
			}
		}

		// from https://github.com/gabboman/wafrn/blob/c34fbd1bd5872d0161db265cbfc91c4f34eb23a3/packages/backend/utils/activitypub/postToJSONLD.ts#L97

		function wafrnCamelize(str: string): string {
			return str.replace(
				/(?:^\w|[A-Z]|\b\w|\s+)/g,
				function (match, index) {
					if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
					return index === 0
						? match.toLowerCase()
						: match.toUpperCase();
				}
			);
		}

		if (body.tag) {
			// emoji: https://eepy.zone/notes/9v98jdptk2cl00cp
			console.log(body.tag);
			for (const i in body.tag) {
				if (body.tag[i].type === 'Emoji') {
					let grabbedEmoji = await getRemoteEmoji(body.tag[i].id);
					noteToInsert.emojis.push(grabbedEmoji.id);
				} else if (body.tag[i].type === 'Hashtag') {
					noteToInsert.tags.push(
						sanitize(body.tag[i].name.replace('#', ''))
					);
				} else if (body.tag[i].type === 'WafrnHashtag') {
					noteToInsert.tags.splice(
						noteToInsert.tags.indexOf(
							'#' + wafrnCamelize(body.tag[i].name)
						),
						1
					);
					noteToInsert.tags.push(sanitize(body.tag[i].name));

					noteToInsert.content = noteToInsert.content.replace(
						'#' + wafrnCamelize(body.tag[i].name),
						''
					);
				} else {
					Logger.warn('ap', 'unused tag type ' + body.tag[i].type);
				}
			}
		}

		await db.getRepository('note').insert(noteToInsert);

		if (noteToInsert['visibility'] === 'public') {
			if (noteToInsert['cw']) {
				await ingest
					.push(
						config.sonic.collectionPrefix + '_cw',
						config.sonic.bucket,
						noteToInsert['id'],
						noteToInsert['cw']
					)
					.catch((e) => {
						Logger.error('sonic', e);
					});
			}

			await ingest
				.push(
					config.sonic.collectionPrefix + '_content',
					config.sonic.bucket,
					noteToInsert['id'],
					noteToInsert['content']
				)
				.catch((e) => {
					Logger.error('sonic', e);
				});
		}

		Logger.info('ap', 'created remote note ' + body.id);

		console.log(noteToInsert);

		return noteToInsert;
	}
}
