import { v4 as uuidv4 } from 'uuid';
import sanitize from '../../../utils/sanitize.js';
import ApActorService from '../ApActorService.js';
import ApNoteService from '../ApNoteService.js';
import logger from '../../../utils/logger.js';
import MfmService from '../../MfmService.js';
import db from '../../../utils/database.js';

class ApNoteProcessor {
	public async new(note) {
		const actor = await ApActorService.get(note.attributedTo);

		const noteId = uuidv4();

		let noteToInsert = {};

		let publishedAt = note.published;
		if (!note.published) publishedAt = new Date(Date.now()).toISOString();

		let visibility: 'direct' | 'followers' | 'unlisted' | 'public';
		visibility = 'direct';

		// nonstandard, aster:visibility extension
		if (note.visibility) {
			if (note.visibility === 'public') {
				visibility = 'public';
			} else if (note.visibility === 'unlisted') {
				visibility = 'unlisted';
			} else if (note.visibility === 'followers') {
				visibility = 'followers';
			} else if (note.visibility === 'direct') {
				visibility = 'direct';
			}
		}

		// also not standard ? i think?
		if (note.directMessage) {
			visibility = 'direct';
		}

		if (note.to.includes(actor.followers_url)) {
			visibility = 'followers';
		}

		if (
			note.cc.includes('https://www.w3.org/ns/activitystreams#Public') &&
			note.to.includes(actor.followers_url)
		) {
			visibility = 'unlisted';
		}

		if (note.to.includes('https://www.w3.org/ns/activitystreams#Public')) {
			visibility = 'public';
		}

		let replyingTo: string;
		if (note.inReplyTo) {
			let replyingToNote = await ApNoteService.get(note.inReplyTo);

			if (replyingToNote) {
				replyingTo = replyingToNote.id;
				logger.debug(
					'ApNoteProcessor.ts',
					'replyingToNote.id ' + replyingToNote.id
				);
			}
		}

		let quoted: string;
		if (note._misskey_quote) {
			let quotedNote = await ApNoteService.get(note._misskey_quote);

			if (quotedNote) {
				quoted = quotedNote.id;
				logger.debug(
					'ApNoteProcessor.ts',
					'_misskey_quote ' + quotedNote.id
				);
			}
		} else if (note.quoteUrl) {
			let quotedNote = await ApNoteService.get(note.quoteUrl);

			if (quotedNote) {
				quoted = quotedNote.id;
				logger.debug('ApNoteProcessor.ts', 'quoteUrl ' + quotedNote.id);
			}
		} else if (note.quoteUri) {
			let quotedNote = await ApNoteService.get(note.quoteUri);

			if (quotedNote) {
				quoted = quotedNote.id;
				logger.debug('ApNoteProcessor.ts', 'quoteUri ' + quotedNote.id);
			}
		}

		let cw: string;
		if (note.summary) cw = sanitize(note.summary);

		let content: string;
		if (
			note.source &&
			note.source.content &&
			note.source.mediaType === 'text/x.misskeymarkdown'
		) {
			content = sanitize(
				MfmService.fromRemote(note.source.content, actor.host)
			);
		} else {
			content = sanitize(MfmService.fromHtml(note.content));
		}

		if (note.attachment) {
			// media: https://eepy.zone/notes/9vdrkue9efha00mz
			for (const i in note.attachment) {
				/*
				TODO: rewrite remote media handling
				await processNewFile(
					note.attachment[i],
					noteToInsert,
					actor
				);
				*/
			}
		}

		/*
		TODO: rewrite tag handling
		if (body.tag && body.tag.length > 0) {
			// emoji: https://eepy.zone/notes/9v98jdptk2cl00cp
			console.log(body.tag);
			for (const i in body.tag) {
				if (body.tag[i].type === 'Emoji') {
					let grabbedEmoji = await getRemoteEmoji(body.tag[i].id);
					console.log('grabbedEmoji !!');
					console.log(grabbedEmoji);
					console.log('grabbedEmoji !!');
					noteToInsert.emojis.push(grabbedEmoji.id);
				} else if (body.tag[i].type === 'Hashtag') {
					noteToInsert.tags.push(
						sanitize(body.tag[i].name.replace('#', ''))
					);
				} else if (body.tag[i].type === 'WafrnHashtag') {
					noteToInsert.tags.splice(
						noteToInsert.tags.indexOf(
							'#' + MfmService.wafrnCamelize(body.tag[i].name)
						),
						1
					);
					noteToInsert.tags.push(sanitize(body.tag[i].name));

					noteToInsert.content = noteToInsert.content.replace(
						'#' + MfmService.wafrnCamelize(body.tag[i].name),
						''
					);
				} else if (body.tag[i].type === 'Mention') {
					if (
						body.tag[i].name.split('@')[2] ===
						new URL(config.get().url).host
					) {
						logger.debug('ap', 'mention for this instance');
						logger.debug('ap', body.tag[i].name.split('@'));

						let grabbedMentionedUser = await db
							.getRepository('user')
							.findOne({
								where: {
									local: true,
									username: body.tag[i].name.split('@')[1]
								}
							});

						if (grabbedMentionedUser) {
							await NotificationService.create(
								grabbedMentionedUser.id,
								noteToInsert['author'],
								'mention',
								noteId
							);
						}
					} else {
						logger.debug('ap', 'mention not for this instance');
					}
				} else {
					logger.warn('ap', 'unused tag type ' + body.tag[i].type);
				}
			}
		}
		*/

		noteToInsert = {
			id: noteId,
			ap_id: sanitize(note.id),
			created_at: publishedAt,
			visibility: visibility,
			author: actor.id,
			local: false,
			replying_to: replyingTo,
			quoted: quoted,
			cw: cw,
			content: content
		};

		await db.getRepository('note').insert(noteToInsert);

		logger.info('ap', 'created remote note ' + note.id);

		console.log(noteToInsert);

		return noteToInsert;
	}
}

export default new ApNoteProcessor();
