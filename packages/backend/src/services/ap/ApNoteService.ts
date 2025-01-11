import punycode from 'node:punycode';

import { In } from 'typeorm';

import db from '../../utils/database.js';
import logger from '../../utils/logger.js';
import reduceSubdomain from '../../utils/reduceSubdomain.js';
import tryUrl from '../../utils/tryUrl.js';
import ConfigService from '../ConfigService.js';
import IdService from '../IdService.js';
import MfmService from '../MfmService.js';
import ModeratedInstanceService from '../ModeratedInstanceService.js';
import QueueService from '../QueueService.js';
import RelationshipService from '../RelationshipService.js';
import SanitizerService from '../SanitizerService.js';
import UserService from '../UserService.js';
import ValidationService from '../ValidationService.js';
import WebsocketService from '../WebsocketService.js';
import NoteService from './../NoteService.js';
import ApActorService from './ApActorService.js';
import ApResolver from './ApResolver.js';
import ApValidationService from './ApValidationService.js';
import ApVisibilityService from './ApVisibilityService.js';

class ApNoteService {
	public async get(apId: ApId, as?: GenericId) {
		const existingNote = await NoteService.get({ apId: apId });
		if (existingNote) return existingNote;

		const resolvedNote = await ApResolver.resolveSigned(apId, as);

		if (!resolvedNote) return false;
		if (resolvedNote.type !== 'Note') return false;

		return await this.register(resolvedNote);
	}

	private async addToBackfillQueue(
		item: ApId,
		parent: GenericId,
		type: 'reply' | 'quote'
	) {
		await QueueService.backfill
			.add(IdService.generate(), {
				object: item,
				type: type,
				addTo: parent
			})
			.then(() => {
				logger.debug(
					'backfill',
					'added ' + item + ' to backfill queue'
				);
			})
			.catch((err) => {
				console.log(err);
				logger.error(
					'backfill',
					'failed to add ' + item + ' to backfill queue'
				);
			});
	}

	// todo: This Thing
	public async apNoteToNote(body: ApObject) {}

	public async register(body: ApObject) {
		if (!ApValidationService.validBody(body)) return false;

		console.log(body); //todo: remove

		const id = IdService.generate();
		let note = {
			id: id,
			apId: SanitizerService.sanitize(body.id),
			local: false,
			attachmentIds: []
		};

		const author = await ApActorService.get(
			body.attributedTo ?? body.actor
		);
		if (!author) return false;
		note['userId'] = author.id;

		const moderatedInstance = await ModeratedInstanceService.get({
			host: punycode.toASCII(reduceSubdomain(author.host))
		});

		note['createdAt'] = body.published
			? new Date(body.published).toISOString()
			: new Date().toISOString();

		const determinedVisibility = await ApVisibilityService.determine(body);

		note['visibility'] = determinedVisibility.visibility;
		note['to'] = determinedVisibility.to;

		let getRelatedNotesAs;
		if (determinedVisibility.to)
			getRelatedNotesAs = await UserService.get({
				id: In(determinedVisibility.to),
				local: true
			});

		let replyingTo;

		if (body.inReplyTo) {
			replyingTo = await this.get(
				body.inReplyTo,
				getRelatedNotesAs ? getRelatedNotesAs.id : undefined
			);

			if (!replyingTo)
				await this.addToBackfillQueue(body.inReplyTo, body.id, 'reply');
		}

		if (replyingTo) note['replyingTo'] = replyingTo.id;

		let quote;

		if (body.quoteUrl)
			quote = await this.get(
				body.quoteUrl,
				getRelatedNotesAs ? getRelatedNotesAs.id : undefined
			);
		if (body.quoteUri)
			quote = await this.get(
				body.quoteUri,
				getRelatedNotesAs ? getRelatedNotesAs.id : undefined
			);
		if (body._misskey_quote)
			quote = await this.get(
				body._misskey_quote,
				getRelatedNotesAs ? getRelatedNotesAs.id : undefined
			);

		if (body.quoteUrl || body.quoteUri || body._misskey_quote)
			if (!quote)
				await this.addToBackfillQueue(
					body.quoteUrl ?? body.quoteUri ?? body._misskey_quote,
					body.id,
					'quote'
				);

		if (quote) note['repeatId'] = quote.id;

		if (body.summary)
			note['cw'] = SanitizerService.sanitize(
				MfmService.localize(body.summary, author.host)
			);
		if (body._misskey_summary)
			note['cw'] = SanitizerService.sanitize(
				MfmService.localize(body._misskey_summary, author.host)
			);

		if (moderatedInstance && moderatedInstance.cw && !note['cw'])
			note['cw'] = moderatedInstance.cw;

		if (body.content)
			note['content'] = SanitizerService.sanitize(
				MfmService.localize(body.content, author.host)
			);
		if (body.source && body.source.content)
			note['content'] = SanitizerService.sanitize(
				MfmService.localize(body.source.content, author.host)
			);
		if (body._misskey_content)
			note['content'] = SanitizerService.sanitize(
				MfmService.localize(body._misskey_content, author.host)
			);

		if (body.attachment) {
			let iterations = 0;

			for (const attachment of body.attachment) {
				iterations++;
				if (iterations < 12) {
					if (!attachment.url) return;

					let driveFile = {
						id: IdService.generate(),
						src: attachment.url,
						userId: note['userId'],
						createdAt: new Date().toISOString()
					};

					if (attachment.name) driveFile['alt'] = attachment.name;
					if (attachment.summary)
						driveFile['alt'] = attachment.summary;

					if (attachment.sensitive)
						driveFile['sensitive'] = Boolean(attachment.sensitive);

					await db
						.getRepository('drive_file')
						.insert(driveFile)
						.then(() => {
							note.attachmentIds.push(driveFile.id);
						})
						.catch((err) => {
							console.log(err);
							logger.error(
								'ap',
								'failed to insert remote note attachment'
							);
						});
				} else {
					logger.debug(
						'note',
						'hit iteration limit on attachments, ignoring rest'
					);
				}
			}
		}

		if (body.replies) {
			console.log('12984984930872');
			if (body.replies.orderedItems || body.replies.items) {
				for (const item of body.replies.orderedItems ??
					body.replies.items) {
					await this.addToBackfillQueue(item, body.id, 'reply');
				}
			} else if (ValidationService.validUrl(body.replies)) {
				let replies = await ApResolver.resolveSigned(body.replies);

				if (replies && replies.orderedItems) {
					for (const item of replies.orderedItems) {
						await this.addToBackfillQueue(item, body.id, 'reply');
					}
				}
			}
		}

		console.log(note); //todo: remove

		await db
			.getRepository('note')
			.insert(note)
			.catch((err) => {
				console.log(err);
				logger.error('ap', 'failed to insert remote note');
			});

		const grabbedNote = await NoteService.get({ id: id });

		const localFollowers = await RelationshipService.getFollowers(
			author.id
		);

		for (const follower of localFollowers) {
			WebsocketService.userEmitter.emit(follower.id, {
				type: 'timeline:add',
				timeline: 'home',
				note: grabbedNote
			});
		}

		if (grabbedNote.visibility === 'public') {
			if (
				ConfigService.bubbleTimeline.enabled &&
				ConfigService.bubbleTimeline.instances.includes(author.host)
			) {
				WebsocketService.globalEmitter.emit('timeline:bubble', {
					type: 'timeline:add',
					timeline: 'bubble',
					note: grabbedNote
				});
			}

			WebsocketService.globalEmitter.emit('timeline:public', {
				type: 'timeline:add',
				timeline: 'public',
				note: grabbedNote
			});
		}

		return grabbedNote;
	}
}

export default new ApNoteService();
