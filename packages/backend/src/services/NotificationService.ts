import db from '../utils/database.js';
import logger from '../utils/logger.js';
import IdService from './IdService.js';
import NoteService from './NoteService.js';
import RelationshipService from './RelationshipService.js';
import UserService from './UserService.js';
import WebsocketService from './WebsocketService.js';

class NotificationService {
	public async get(where: where) {
		return await db
			.getRepository('notification')
			.createQueryBuilder('notification')
			.leftJoinAndSelect('notification.user', 'user')
			.leftJoinAndSelect('notification.note', 'note')
			.leftJoinAndSelect('notification.relationship', 'relationship')
			.where(where)
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
			.getRepository('notification')
			.createQueryBuilder('notification')
			.leftJoinAndSelect('notification.user', 'user')
			.leftJoinAndSelect('notification.note', 'note')
			.leftJoinAndSelect('notification.relationship', 'relationship')
			.where(where)
			.orWhere(orWhere ?? where)
			.take(take)
			.orderBy(order, orderDirection)
			.getMany();
	}

	public async create(
		to: GenericId,
		from: GenericId,
		type: NotificationType,
		note?: GenericId,
		user?: GenericId,
		relationship?: GenericId
	) {
		const sender = await UserService.get({ id: from });
		const recipient = await UserService.get({ id: to });

		if (!sender)
			return {
				error: true,
				message: 'No sender found'
			};
		if (!recipient)
			return {
				error: true,
				message: 'No recipient found'
			};

		if (sender.id === recipient.id)
			return {
				error: true,
				message: "Cannot send notification to the user it's from"
			};

		if (!recipient.local)
			return {
				error: true,
				message: 'Cannot send notification to non-local user'
			};

		const id = IdService.generate();

		const notification = {
			id: id,
			toId: recipient.id,
			fromId: sender.id,
			type: type,
			read: false,
			createdAt: new Date().toISOString()
		};

		const grabbedNote = await NoteService.get({ id: note });
		if (grabbedNote) notification['noteId'] = grabbedNote.id;

		const grabbedUser = await UserService.get({ id: user });
		if (grabbedUser) notification['userId'] = grabbedUser.id;

		const grabbedRelationship = await RelationshipService.get({
			id: relationship
		});
		if (grabbedRelationship)
			notification['relationshipId'] = grabbedRelationship.id;

		await db
			.getRepository('notification')
			.insert(notification)
			.catch((err) => {
				console.log(err);
			});

		WebsocketService.userEmitter.emit(to, {
			type: 'notification:add',
			notification: await this.get({ id: id })
		});
	}
}

export default new NotificationService();
