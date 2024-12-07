import { ObjectLiteral } from 'typeorm';

import config from '../utils/config.js';
import db from '../utils/database.js';
import locale from '../utils/locale.js';
import logger from '../utils/logger.js';
import ApAnnounceRenderer from './ap/ApAnnounceRenderer.js';
import ApCreateRenderer from './ap/ApCreateRenderer.js';
import ApDeleteRenderer from './ap/ApDeleteRenderer.js';
import ApDeliverService from './ap/ApDeliverService.js';
import ApNoteRenderer from './ap/ApNoteRenderer.js';
import IdService from './IdService.js';
import NotificationService from './NotificationService.js';
import SanitizerService from './SanitizerService.js';
import UserService from './UserService.js';

class NoteService {
	public async get(where: where, orWhere?: where) {
		return await db
			.getRepository('note')
			.createQueryBuilder('note')
			.leftJoinAndSelect('note.user', 'user')
			.leftJoinAndSelect('note.repeat', 'repeat')
			.leftJoin('repeat.user', 'repeat_user')
			.addSelect(['repeat_user.id'])
			.addSelect(['repeat_user.username'])
			.addSelect(['repeat_user.host'])
			.addSelect(['repeat_user.displayName'])
			.addSelect(['repeat_user.avatar'])
			.addSelect(['repeat_user.avatarAlt'])
			.addSelect(['repeat_user.isCat'])
			.addSelect(['repeat_user.local'])
			.leftJoinAndSelect('repeat.repeats', 'repeat_repeats')
			.leftJoinAndSelect('repeat.likes', 'repeat_likes')
			.leftJoinAndSelect('note.repeats', 'repeats')
			.leftJoin('repeats.user', 'repeats_user')
			.addSelect(['repeats_user.id'])
			.addSelect(['repeats_user.username'])
			.addSelect(['repeats_user.host'])
			.addSelect(['repeats_user.displayName'])
			.addSelect(['repeats_user.avatar'])
			.addSelect(['repeats_user.avatarAlt'])
			.addSelect(['repeats_user.isCat'])
			.addSelect(['repeats_user.local'])
			.leftJoinAndSelect('note.likes', 'note_like')
			.leftJoin('note_like.user', 'like_user')
			.addSelect(['like_user.id'])
			.addSelect(['like_user.username'])
			.addSelect(['like_user.host'])
			.addSelect(['like_user.displayName'])
			.addSelect(['like_user.avatar'])
			.addSelect(['like_user.avatarAlt'])
			.addSelect(['like_user.isCat'])
			.addSelect(['like_user.local'])
			.where(where)
			.orWhere(orWhere)
			.getOne();
	}

	public async getMany(
		where: where,
		take?: number,
		order?: string,
		orderDirection?: 'ASC' | 'DESC',
		orWhere?: where
	) {
		return await db
			.getRepository('note')
			.createQueryBuilder('note')
			.leftJoinAndSelect('note.user', 'user')
			.leftJoinAndSelect('note.repeat', 'repeat')
			.leftJoin('repeat.user', 'repeat_user')
			.addSelect(['repeat_user.id'])
			.addSelect(['repeat_user.username'])
			.addSelect(['repeat_user.host'])
			.addSelect(['repeat_user.displayName'])
			.addSelect(['repeat_user.avatar'])
			.addSelect(['repeat_user.avatarAlt'])
			.addSelect(['repeat_user.isCat'])
			.addSelect(['repeat_user.local'])
			.leftJoinAndSelect('repeat.repeats', 'repeat_repeats')
			.leftJoinAndSelect('repeat.likes', 'repeat_likes')
			.leftJoinAndSelect('note.repeats', 'repeats')
			.leftJoin('repeats.user', 'repeats_user')
			.addSelect(['repeats_user.id'])
			.addSelect(['repeats_user.username'])
			.addSelect(['repeats_user.host'])
			.addSelect(['repeats_user.displayName'])
			.addSelect(['repeats_user.avatar'])
			.addSelect(['repeats_user.avatarAlt'])
			.addSelect(['repeats_user.isCat'])
			.addSelect(['repeats_user.local'])
			.leftJoinAndSelect('note.likes', 'note_like')
			.leftJoin('note_like.user', 'like_user')
			.addSelect(['like_user.id'])
			.addSelect(['like_user.username'])
			.addSelect(['like_user.host'])
			.addSelect(['like_user.displayName'])
			.addSelect(['like_user.avatar'])
			.addSelect(['like_user.avatarAlt'])
			.addSelect(['like_user.isCat'])
			.addSelect(['like_user.local'])
			.where(where)
			.orWhere(orWhere)
			.take(take)
			.orderBy(order, orderDirection)
			.getMany();
	}

	public async delete(where: where) {
		const note = await this.get(where);
		if (note) {
			const del = ApDeleteRenderer.render(
				IdService.generate(),
				note.user.id,
				note.apId
			);

			await ApDeliverService.deliverToFollowers(del, note.user.id);
		}

		return db.getRepository('note').delete(where);
	}

	public async like(noteId: GenericId, as: GenericId, toggle?: boolean) {
		const id = IdService.generate();

		const user = await UserService.get({ id: as });

		const existingLike = await db.getRepository('note_like').findOne({
			where: {
				userId: user.id,
				noteId: noteId
			}
		});

		if (existingLike) {
			if (toggle) {
				return await db
					.getRepository('note_like')
					.delete({
						userId: user.id,
						noteId: noteId
					})
					.then(() => {
						return {
							status: 200,
							message: 'Removed like'
						};
					})
					.catch((err) => {
						console.error(err);
						logger.error('note', 'like delete failed');
						return {
							status: 500,
							message: 'Failed to remove like'
						};
					});
			} else {
				return {
					status: 409,
					message: 'Like already exists'
				};
			}
		} else {
			const like = {
				id: id,
				userId: user.id,
				noteId: noteId,
				createdAt: new Date().toISOString()
			};

			return await db
				.getRepository('note_like')
				.insert(like)
				.then(() => {
					return {
						status: 200,
						message: 'Added like'
					};
				})
				.catch((err) => {
					console.error(err);
					logger.error('note', 'like failed');
					return {
						status: 500,
						message: 'Failed to add like'
					};
				});
		}
	}

	public async create(
		user: GenericId,
		cw: string,
		content: string,
		visibility?: string,
		repeat?: GenericId
	) {
		// if repeat, missing content is allowed. if content, it's a quote.
		if (!repeat && content && content.length <= 0)
			return {
				error: true,
				status: 400,
				message: locale.note.contentTooShort
			};

		if (cw && cw.length > config.limits.soft.cw)
			return {
				error: true,
				status: 400,
				message: locale.note.contentWarningTooLong
			};

		if (!repeat && content.length > config.limits.soft.note)
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

		const instanceUrl = new URL(config.url);

		const id = IdService.generate();

		const note = {
			id: id,
			apId: instanceUrl.href + 'notes/' + id,
			userId: user,
			cw: SanitizerService.sanitize(cw),
			content: SanitizerService.sanitize(content),
			visibility: visibility,
			createdAt: new Date().toISOString()
		};

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

		if (repeat && repeatedNote && !content) {
			const announce = await ApAnnounceRenderer.render(
				IdService.generate(),
				user,
				note.visibility,
				repeatedNote.local
					? ApNoteRenderer.render(repeatedNote)
					: repeatedNote.apId
			);

			await ApDeliverService.deliverToFollowers(announce, user);
		} else {
			const create = ApCreateRenderer.render(
				IdService.generate(),
				user,
				ApNoteRenderer.render(await this.get({ id: note.id }))
			);

			await ApDeliverService.deliverToFollowers(create, user);
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

	/*  for use strictly for a plain repeat
		these toggle(ish), quotes do not
	*/
	public async repeat(
		noteId: GenericId,
		as: GenericId,
		toggle?: boolean,
		visibility?: string
	) {
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
