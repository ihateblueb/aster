import db from '../utils/database.js';
import locale from '../utils/locale.js';
import logger from '../utils/logger.js';
import ApDeliverService from './ap/ApDeliverService.js';
import ApEmojiReactRenderer from './ap/ApEmojiReactRenderer.js';
import ApUndoRenderer from './ap/ApUndoRenderer.js';
import ConfigService from './ConfigService.js';
import EmojiService from './EmojiService.js';
import IdService from './IdService.js';
import LikeService from './LikeService.js';
import NoteService from './NoteService.js';
import NotificationService from './NotificationService.js';
import UserService from './UserService.js';
import VisibilityService from './VisibilityService.js';

class ReactionService {
	public async get(where: where, orWhere?: where) {
		return await db
			.getRepository('note_react')
			.createQueryBuilder('note_react')
			.leftJoinAndSelect('note_react.user', 'user')
			.leftJoinAndSelect('note_react.note', 'note')
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
			.getRepository('note_react')
			.createQueryBuilder('note_react')
			.leftJoinAndSelect('note_react.user', 'user')
			.leftJoinAndSelect('note_react.note', 'note')

			.where(where)
			.orWhere(orWhere ?? where)
			.take(take)
			.orderBy(order, direction)
			.getMany();
	}

	public async delete(where: where) {
		return db
			.getRepository('note_react')
			.createQueryBuilder('note_react')
			.leftJoinAndSelect('note_react.user', 'user')
			.leftJoinAndSelect('note_react.note', 'note')

			.where(where)
			.delete();
	}

	public async create(
		noteId: GenericId,
		emojiId: GenericId,
		content: string,
		as: GenericId,
		toggle?: boolean,
		apId?: ApId
	) {
		const id = IdService.generate();

		const user = await UserService.get({ id: as });
		const note = await NoteService.get({ id: noteId });
		const emoji = await EmojiService.get({ id: emojiId });

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

		const likeEquivalent = [
			'⭐️',
			'❤',
			'💟',
			'♥️',
			'❤️',
			'🧡',
			'💛',
			'💚',
			'💙',
			'💜',
			'🩷',
			'🤍',
			'🩶',
			'🩵',
			'🤎'
		];

		if (content && likeEquivalent.includes(content)) {
			return LikeService.create(noteId, as, toggle, apId).then((e) => {
				return {
					status: e.status,
					message: 'Skipped react: ' + e.message.toLowerCase()
				};
			});
		}

		const existingReact = await this.get({
			user: { id: user.id },
			note: { id: note.id }
		});

		if (existingReact) {
			if (toggle) {
				return await db
					.getRepository('note_react')
					.delete({
						id: existingReact.id
					})
					.then(async () => {
						if (user.local) {
							const activity = ApUndoRenderer.render(
								ApEmojiReactRenderer.render(
									ConfigService.url.href +
										'react/' +
										existingReact.id,
									user.id,
									note.apId,
									emoji,
									content
								)
							);

							await ApDeliverService.deliverToFollowers(
								activity,
								user.id
							);
						}

						return {
							status: 200,
							message: 'Removed react'
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
					message: 'React already exists'
				};
			}
		} else {
			const react = {
				id: id,
				apId: apId ?? ConfigService.url.href + 'like/' + id,
				userId: user.id,
				noteId: noteId,
				emojiId: emojiId,
				content: content,
				createdAt: new Date().toISOString()
			};

			return await db
				.getRepository('note_react')
				.insert(react)
				.then(async () => {
					if (user.local) {
						const activity = ApEmojiReactRenderer.render(
							ConfigService.url.href + 'react/' + react.id,
							user.id,
							note.apId,
							emoji,
							content
						);

						await ApDeliverService.deliverToFollowers(
							activity,
							user.id
						);
					}

					await NotificationService.create(
						note.user.id,
						user.id,
						'react',
						note.id
					);

					return {
						status: 201,
						message: 'Added react'
					};
				})
				.catch((err) => {
					console.error(err);
					logger.error('note', 'react create failed');
					return {
						status: 500,
						message: 'Internal server error'
					};
				});
		}
	}
}

export default new ReactionService();
