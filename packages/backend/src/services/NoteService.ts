import * as uuid from 'uuid';

import config from '../utils/config.js';
import db from '../utils/database.js';
import locale from '../utils/locale.js';
import logger from '../utils/logger.js';
import ApCreateRenderer from './ap/ApCreateRenderer.js';
import ApDeliverService from './ap/ApDeliverService.js';
import ApNoteRenderer from './ap/ApNoteRenderer.js';
import SanitizerService from './SanitizerService.js';
import UserService from './UserService.js';

class NoteService {
	public async get(where: object) {
		return await db
			.getRepository('note')
			.createQueryBuilder('note')
			.leftJoinAndSelect('note.user', 'user')
			.leftJoinAndSelect('note.likes', 'note_like')
			.leftJoin('note_like.user', 'like_user')
			.addSelect(['like_user.id'])
			.addSelect(['like_user.username'])
			.addSelect(['like_user.host'])
			.addSelect(['like_user.displayName'])
			.addSelect(['like_user.avatar'])
			.addSelect(['like_user.avatarAlt'])
			.addSelect(['like_user.isCat'])
			.where(where)
			.getOne();
	}

	public async getMany(
		where: object,
		take?: number,
		order?: string,
		orderDirection?: 'ASC' | 'DESC'
	) {
		return await db
			.getRepository('note')
			.createQueryBuilder('note')
			.leftJoinAndSelect('note.user', 'user')
			.leftJoinAndSelect('note.likes', 'note_like')
			.leftJoin('note_like.user', 'like_user')
			.addSelect(['like_user.id'])
			.addSelect(['like_user.username'])
			.addSelect(['like_user.host'])
			.addSelect(['like_user.displayName'])
			.addSelect(['like_user.avatar'])
			.addSelect(['like_user.avatarAlt'])
			.addSelect(['like_user.isCat'])
			.where(where)
			.take(take)
			.orderBy(order, orderDirection)
			.getMany();
	}

	public async delete(where: object) {
		return db.getRepository('note').delete(where);
	}

	public async like(noteId: string, as: string, toggle?: boolean) {
		const id = uuid.v7();

		let user = await UserService.get({ id: as });

		let existingLike = await db.getRepository('note_like').findOne({
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
			let like = {
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
		user: string,
		cw: string,
		content: string,
		visibility?: string,
		repeat?: string
	) {
		// if repeat, missing content is allowed. if content, it's a quote.
		if ((!content && !repeat) || (content && content.length <= 0))
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

		if (content.length > config.limits.soft.note)
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

		const id = uuid.v7();

		let note = {
			id: id,
			apId: instanceUrl.href + 'notes/' + id,
			userId: user,
			cw: SanitizerService.sanitize(cw),
			content: SanitizerService.sanitize(content),
			visibility: visibility,
			createdAt: new Date().toISOString()
		};

		if (repeat) {
			let repeatedNote = await this.get({ id: repeat });

			if (!repeatedNote)
				return {
					error: true,
					status: 400,
					message: locale.note.repeatTargetNotFound
				};

			note['repeatId'] = repeatedNote.id;
		}

		let result = await db
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

		let create = ApCreateRenderer.render(
			uuid.v7(),
			user,
			ApNoteRenderer.render(await this.get({ id: note.id }))
		);

		await ApDeliverService.deliverToFollowers(create, user);

		return result;
	}
}

export default new NoteService();
