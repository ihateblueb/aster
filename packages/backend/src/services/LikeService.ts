import db from '../utils/database.js';
import locale from '../utils/locale.js';
import logger from '../utils/logger';
import ApDeliverService from './ap/ApDeliverService.js';
import ApLikeRenderer from './ap/ApLikeRenderer';
import ApUndoRenderer from './ap/ApUndoRenderer';
import ConfigService from './ConfigService.js';
import IdService from './IdService.js';
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
			.orWhere(orWhere)
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

	public async create(
		noteId: GenericId,
		as: GenericId,
		toggle?: boolean,
		apId?: ApId
	) {
		const id = IdService.generate();

		const user = await UserService.get({ id: as });
		const note = await this.get({ id: noteId });

		if (
			!(await VisibilityService.canISee(
				await this.get({ id: noteId }),
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
							message: 'Removed like'
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
					message: 'Like already exists'
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
						status: 200,
						message: 'Added like'
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
