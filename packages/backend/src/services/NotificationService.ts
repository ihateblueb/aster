import { ObjectLiteral } from 'typeorm';

import db from '../utils/database.js';
import UserMini from '../utils/entities/UserMini.js';
import IdService from './IdService.js';
import NoteService from './NoteService.js';
import NotificationRenderer from './NotificationRenderer.js';
import RelationshipService from './RelationshipService.js';
import ReportService from './ReportService.js';
import UserService from './UserService.js';
import WebsocketService from './WebsocketService.js';

class NotificationService {
	public async get(where: where) {
		return await db
			.getRepository('notification')
			.createQueryBuilder('notification')
			.leftJoinAndSelect('notification.to', 'to')
			.leftJoinAndSelect('notification.from', 'from')
			.leftJoinAndSelect('notification.user', 'user')

			.leftJoinAndSelect('notification.note', 'note')
			.leftJoinAndSelect('note.user', 'note_user')

			.leftJoinAndSelect('notification.relationship', 'relationship')
			.where(where)
			.getOne();
	}

	public async getMany(
		where: where,
		take?: number,
		order?: string,
		orderDirection?: 'ASC' | 'DESC',
		orWhere?: where,
		andWhere?: where
	) {
		return await db
			.getRepository('notification')
			.createQueryBuilder('notification')
			.leftJoinAndSelect('notification.to', 'to')
			.leftJoinAndSelect('notification.from', 'from')
			.leftJoinAndSelect('notification.user', 'user')

			.leftJoinAndSelect('notification.note', 'note')
			.leftJoin('note.user', 'note_user')
			.addSelect(UserMini('note_user'))

			.leftJoinAndSelect('notification.relationship', 'relationship')
			.where(where)
			.orWhere(orWhere ?? where)
			.andWhere(andWhere ?? where)
			.take(take)
			.orderBy(order, orderDirection)
			.getMany();
	}

	public async update(where: where, entity: Partial<ObjectLiteral>) {
		return await db.getRepository('notification').update(where, entity);
	}

	public async read(id: GenericId) {
		return this.update(
			{
				id: id
			},
			{
				read: true
			}
		);
	}

	public async create(
		to: GenericId,
		from: GenericId,
		type: NotificationType,
		note?: GenericId,
		user?: GenericId,
		relationship?: GenericId,
		report?: GenericId
	) {
		console.log('nbotifnote ' + note);

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

		if (
			!(await RelationshipService.eitherBlocking(recipient.id, sender.id))
		)
			return {
				error: true,
				message: 'Cannot interact with this user'
			};

		const id = IdService.generate();

		let notification = {
			id: id,
			toId: recipient.id,
			fromId: sender.id,
			type: type,
			read: false,
			createdAt: new Date().toISOString()
		};

		if (note)
			await NoteService.get({
				id: note
			}).then((e) => {
				if (e) notification['noteId'] = e.id;
			});

		if (user)
			await UserService.get({
				id: user
			}).then((e) => {
				if (e) notification['userId'] = e.id;
			});

		if (relationship)
			await RelationshipService.get({
				id: relationship
			}).then((e) => {
				if (e) notification['relationshipId'] = e.id;
			});

		if (report)
			await ReportService.get({
				id: report
			}).then((e) => {
				if (e) notification['reportId'] = e.id;
			});

		console.log(notification);

		return await db
			.getRepository('notification')
			.insert(notification)
			.catch((err) => {
				console.log(err);
			})
			.then(async () => {
				await WebsocketService.publish(to, {
					type: 'notification:add',
					notification: await NotificationRenderer.render(
						await this.get({ id: id })
					)
				});
				return true;
			});
	}
}

export default new NotificationService();
