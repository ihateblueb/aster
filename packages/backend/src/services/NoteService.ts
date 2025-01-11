import { ObjectLiteral } from 'typeorm';

import db from '../utils/database.js';
import UserMini from '../utils/entities/UserMini.js';
import locale from '../utils/locale.js';
import logger from '../utils/logger.js';
import ApAnnounceRenderer from './ap/ApAnnounceRenderer.js';
import ApCreateRenderer from './ap/ApCreateRenderer.js';
import ApDeleteRenderer from './ap/ApDeleteRenderer.js';
import ApDeliverService from './ap/ApDeliverService.js';
import ApNoteRenderer from './ap/ApNoteRenderer.js';
import ApUndoRenderer from './ap/ApUndoRenderer.js';
import ConfigService from './ConfigService.js';
import IdService from './IdService.js';
import NotificationService from './NotificationService.js';
import RelationshipService from './RelationshipService.js';
import SanitizerService from './SanitizerService.js';
import VisibilityService from './VisibilityService.js';
import WebsocketService from './WebsocketService.js';

class NoteService {
	public async get(where: where, orWhere?: where) {
		return await db
			.getRepository('note')
			.createQueryBuilder('note')
			.leftJoinAndSelect('note.user', 'user')

			//reply
			.leftJoinAndSelect('note.replyingTo', 'replyingTo')
			.leftJoinAndSelect('replyingTo.user', 'replyingTo_user')

			.leftJoinAndSelect('replyingTo.repeat', 'replyingTo_repeat')
			.leftJoin('replyingTo_repeat.user', 'replyingTo_repeat_user')
			.addSelect(UserMini('replyingTo_repeat_user'))

			.leftJoinAndSelect('replyingTo.repeats', 'replyingTo_repeats')
			.leftJoin('replyingTo_repeats.user', 'replyingTo_repeats_user')
			.addSelect(UserMini('replyingTo_repeats_user'))

			.leftJoinAndSelect('replyingTo.likes', 'replyingTo_likes')
			.leftJoin('replyingTo_likes.user', 'replyingTo_likes_user')
			.addSelect(UserMini('replyingTo_likes_user'))

			// repeat
			.leftJoinAndSelect('note.repeat', 'repeat')

			.leftJoin('repeat.user', 'repeat_user')
			.addSelect(UserMini('repeat_user'))

			.leftJoinAndSelect('repeat.repeats', 'repeat_repeats')
			.leftJoinAndSelect('repeat.likes', 'repeat_likes')

			.leftJoinAndSelect('note.repeats', 'repeats')
			.leftJoin('repeats.user', 'repeats_user')
			.addSelect(UserMini('repeats_user'))

			//likes
			.leftJoinAndSelect('note.likes', 'note_likes')
			.leftJoin('note_likes.user', 'likes_user')
			.addSelect(UserMini('likes_user'))

			// attachments
			.leftJoinAndSelect('note.attachments', 'attachments')

			.where(where)
			.orWhere(orWhere ?? where)
			.getOne();
	}

	public async getMany(
		where: where,
		take?: number,
		order?: string,
		direction?: 'ASC' | 'DESC',
		orWhere?: where
	) {
		return await db
			.getRepository('note')
			.createQueryBuilder('note')
			.leftJoinAndSelect('note.user', 'user')

			//reply
			.leftJoinAndSelect('note.replyingTo', 'replyingTo')
			.leftJoinAndSelect('replyingTo.user', 'replyingTo_user')

			.leftJoinAndSelect('replyingTo.repeat', 'replyingTo_repeat')
			.leftJoin('replyingTo_repeat.user', 'replyingTo_repeat_user')
			.addSelect(UserMini('replyingTo_repeat_user'))

			.leftJoinAndSelect('replyingTo.repeats', 'replyingTo_repeats')
			.leftJoin('replyingTo_repeats.user', 'replyingTo_repeats_user')
			.addSelect(UserMini('replyingTo_repeats_user'))

			.leftJoinAndSelect('replyingTo.likes', 'replyingTo_likes')
			.leftJoin('replyingTo_likes.user', 'replyingTo_likes_user')
			.addSelect(UserMini('replyingTo_likes_user'))

			// repeat
			.leftJoinAndSelect('note.repeat', 'repeat')

			.leftJoin('repeat.user', 'repeat_user')
			.addSelect(UserMini('repeat_user'))

			.leftJoinAndSelect('repeat.repeats', 'repeat_repeats')
			.leftJoinAndSelect('repeat.likes', 'repeat_likes')

			.leftJoinAndSelect('note.repeats', 'repeats')
			.leftJoin('repeats.user', 'repeats_user')
			.addSelect(UserMini('repeats_user'))

			//likes
			.leftJoinAndSelect('note.likes', 'note_like')
			.leftJoin('note_like.user', 'like_user')
			.addSelect(UserMini('like_user'))

			.where(where)
			.orWhere(orWhere ?? where)
			.take(take)
			.orderBy(order, direction)
			.getMany();
	}

	public async delete(where: where) {
		const note = await this.get(where);
		console.log(note);

		if (!note) return;

		if (
			note.user.local &&
			note.repeat &&
			(!note.content || note.content.length >= 0)
		) {
			const undo = ApUndoRenderer.render(
				await ApAnnounceRenderer.render(note, note.repeat.apId)
			);

			await ApDeliverService.deliverToFollowers(undo, note.user.id);
		} else {
			const del = ApDeleteRenderer.render(
				IdService.generate(),
				note.user.id,
				note.apId
			);

			await ApDeliverService.deliverToFollowers(del, note.user.id);
		}

		return db.getRepository('note').delete(where);
	}

	public async create(
		user: GenericId,
		cw: string,
		content: string,
		visibility?: string,
		repeat?: GenericId,
		replyingTo?: GenericId
	) {
		// if repeat, missing content is allowed. if content, it's a quote.
		if (!repeat && content && content.length <= 0)
			return {
				error: true,
				status: 400,
				message: locale.note.contentTooShort
			};

		if (cw && cw.length > ConfigService.limits.soft.cw)
			return {
				error: true,
				status: 400,
				message: locale.note.contentWarningTooLong
			};

		if (!repeat && content.length > ConfigService.limits.soft.note)
			return {
				error: true,
				status: 400,
				message: locale.note.contentTooLong
			};

		if (!['public', 'unlisted', 'followers', 'direct'].includes(visibility))
			return {
				error: true,
				status: 400,
				message: locale.note.visibilityInvalid
			};

		const instanceUrl = ConfigService.url;

		const id = IdService.generate();

		let note = {
			id: id,
			apId: instanceUrl.href + 'notes/' + id,
			userId: user,
			cw: SanitizerService.sanitize(cw),
			content: SanitizerService.sanitize(content),
			visibility: visibility,
			createdAt: new Date().toISOString()
		};

		let replyingToNote: ObjectLiteral;

		if (replyingTo) {
			replyingToNote = await this.get({ id: replyingTo });

			if (visibility !== replyingToNote.visibility) {
				note.visibility = replyingToNote.visibility;
			}

			if (!replyingToNote)
				return {
					error: true,
					status: 400,
					message: locale.note.replyTargetNotFound
				};

			if (!(await VisibilityService.canISee(replyingToNote, user)))
				return {
					error: true,
					status: 400,
					message: locale.note.cannotReplyToNote
				};

			note['replyingToId'] = replyingToNote.id;
		}

		let repeatedNote: ObjectLiteral;

		if (repeat) {
			repeatedNote = await this.get({ id: repeat });

			if (visibility !== repeatedNote.visibility) {
				note.visibility = repeatedNote.visibility;
			}

			if (!repeatedNote)
				return {
					error: true,
					status: 400,
					message: locale.note.repeatTargetNotFound
				};

			if (!(await VisibilityService.canISee(repeatedNote, user)))
				return {
					error: true,
					status: 400,
					message: locale.note.cannotRepeatNote
				};

			note['repeatId'] = repeatedNote.id;
		}

		const result = await db
			.getRepository('note')
			.insert(note)
			.then(() => {
				return {
					error: false,
					status: 200,
					message: locale.note.created,
					note: note
				};
			})
			.catch((e) => {
				console.log(e);
				return {
					error: true,
					status: 500,
					message: locale.note.failedCreate
				};
			});

		const newNote = await this.get({ id: note.id });

		if (repeat && repeatedNote && repeatedNote.user.local && !content) {
			const announce = await ApAnnounceRenderer.render(
				newNote,
				repeatedNote.apId
			);

			await ApDeliverService.deliverToFollowers(announce, user);
		} else {
			const create = ApCreateRenderer.render(
				await ApNoteRenderer.render(newNote)
			);

			await ApDeliverService.deliverToFollowers(create, user);
		}

		if (note.visibility !== 'direct') {
			const localFollowers = await RelationshipService.getMany({
				to: { id: user },
				from: { local: true },
				type: 'follow',
				pending: false
			});

			localFollowers.push({
				id: user
			});

			for (const follower of localFollowers) {
				WebsocketService.userEmitter.emit(follower.id, {
					type: 'timeline:add',
					timeline: 'home',
					note: await this.get({ id: note.id })
				});
			}

			WebsocketService.globalEmitter.emit('timeline:local', {
				type: 'timeline:add',
				timeline: 'local',
				note: await this.get({ id: note.id })
			});

			if (ConfigService.bubbleTimeline.enabled) {
				WebsocketService.globalEmitter.emit('timeline:bubble', {
					type: 'timeline:add',
					timeline: 'bubble',
					note: await this.get({ id: note.id })
				});
			}

			WebsocketService.globalEmitter.emit('timeline:public', {
				type: 'timeline:add',
				timeline: 'public',
				note: await this.get({ id: note.id })
			});
		}

		if (repeat && repeatedNote) {
			await NotificationService.create(
				repeatedNote.user.id,
				user,
				'repeat',
				content ? note.id : repeatedNote.id
			).catch((err) => {
				console.log(err);
			});
		}

		return result;
	}

	/*
	 *	for use strictly for a plain repeat
	 *	these toggle(ish), quotes do not
	 *	this is only okay as apart of the NoteService because it's
	 *	basically just a note with a different attribute added on
	 */
	public async repeat(
		noteId: GenericId,
		as: GenericId,
		toggle?: boolean,
		visibility?: string
	) {
		if (
			!(await VisibilityService.canISee(
				await this.get({ id: noteId }),
				as
			))
		)
			return {
				status: 404,
				message: 'Note not found'
			};

		const existingRepeat = await this.get({
			user: { id: as },
			repeatId: noteId
		});

		if (toggle && existingRepeat) {
			return await this.delete({ id: existingRepeat.id })
				.then(() => {
					logger.debug('repeat', 'failed to delete');
					return {
						error: false,
						status: 200,
						message: locale.note.deleted
					};
				})
				.catch((err) => {
					console.log(err);
					return {
						error: true,
						status: 500,
						message: locale.error.internalServer
					};
				});
		} else {
			return await this.create(as, '', '', visibility ?? 'public', noteId)
				.then((e) => {
					if (e.error) {
						logger.debug('repeat', 'failed to create');
						return {
							error: e.error,
							status: e.status,
							message: e.message
						};
					} else {
						logger.debug('repeat', 'created');
						return {
							error: false,
							status: 200,
							message: locale.note.created
						};
					}
				})
				.catch((err) => {
					console.log(err);
					return {
						error: true,
						status: 500,
						message: locale.error.internalServer
					};
				});
		}
	}
}

export default new NoteService();
