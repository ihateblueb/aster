import db from '../utils/database.js';
import locale from '../utils/locale.js';
import logger from '../utils/logger.js';
import ApDeliverService from './ap/ApDeliverService.js';
import ApLikeRenderer from './ap/ApLikeRenderer.js';
import ApUndoRenderer from './ap/ApUndoRenderer.js';
import ConfigService from './ConfigService.js';
import IdService from './IdService.js';
import NoteRenderer from './NoteRenderer.js';
import NoteService from './NoteService.js';
import NotificationService from './NotificationService.js';
import UserService from './UserService.js';
import VisibilityService from './VisibilityService.js';

class LikeService {
	public async get(where: where, orWhere?: where) {
		return await db
			.getRepository('note_like')
			.createQueryBuilder('note_like')
			.leftJoinAndSelect('note_like.user', 'user')
			.leftJoinAndSelect('note_like.note', 'note')
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
			.getRepository('note_like')
			.createQueryBuilder('note_like')
			.leftJoinAndSelect('note_like.user', 'user')
			.leftJoinAndSelect('note_like.note', 'note')

			.where(where)
			.orWhere(orWhere ?? where)
			.take(take)
			.orderBy(order, direction)
			.getMany();
	}

	public async delete(where: where) {
		return db
			.getRepository('note_like')
			.createQueryBuilder('note_like')
			.leftJoinAndSelect('note_like.user', 'user')
			.leftJoinAndSelect('note_like.note', 'note')

			.where(where)
			.delete();
	}

	public async create(
		noteId: GenericId,
		as: GenericId,
		toggle?: boolean,
		apId?: ApId
	) {
		const id = IdService.generate();

		const user = await UserService.get({ id: as });
		const note = await NoteService.get({ id: noteId });

		if (
			(user.local || note.user.local) &&
			!(await VisibilityService.canISee(
				await NoteService.get({ id: noteId }),
				as
			))
		)
			return {
				status: 404,
				message: locale.note.notFound
			};

		const existingLike = await this.get({
			user: { id: user.id },
			note: { id: note.id }
		});

		if (existingLike) {
			if (toggle) {
				return await db
					.getRepository('note_like')
					.delete({
						id: existingLike.id
					})
					.then(async () => {
						if (user.local) {
							const activity = ApUndoRenderer.render(
								ApLikeRenderer.render(
									ConfigService.url.href +
										'like/' +
										existingLike.id,
									user.id,
									note.apId
								)
							);

							await ApDeliverService.deliverToFollowers(
								activity,
								user.id
							);
						}

						return {
							status: 200,
							message: 'Removed like',
							note: await NoteRenderer.render(
								await NoteService.get(note.id)
							)
						};
					})
					.catch((err) => {
						console.error(err);
						return {
							status: 500,
							message: 'Internal server error'
						};
					});
			} else {
				return {
					status: 409,
					message: 'Like already exists',
					note: await NoteRenderer.render(
						await NoteService.get(note.id)
					)
				};
			}
		} else {
			const like = {
				id: id,
				apId: apId ?? ConfigService.url.href + 'like/' + id,
				userId: user.id,
				noteId: noteId,
				createdAt: new Date().toISOString()
			};

			return await db
				.getRepository('note_like')
				.insert(like)
				.then(async () => {
					if (user.local) {
						const activity = ApLikeRenderer.render(
							ConfigService.url.href + 'like/' + like.id,
							user.id,
							note.apId
						);

						await ApDeliverService.deliverToFollowers(
							activity,
							user.id
						);
					}

					await NotificationService.create(
						note.user.id,
						user.id,
						'like',
						note.id
					);

					return {
						status: 201,
						message: 'Added like',
						note: await NoteRenderer.render(
							await NoteService.get(note.id)
						)
					};
				})
				.catch((err) => {
					console.error(err);
					logger.error('note', 'like create failed');
					return {
						status: 500,
						message: 'Internal server error'
					};
				});
		}
	}
}

export default new LikeService();
