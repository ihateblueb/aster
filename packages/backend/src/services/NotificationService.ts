import db from '../utils/database.js';
import IdService from './IdService.js';
import NoteService from './NoteService.js';
import RelationshipService from './RelationshipService.js';
import UserService from './UserService.js';

class NotificationService {
	public async get(where: where) {}
	public async getMany(where: where) {}

	public async create(
		to: GenericId,
		from: GenericId,
		type: NotificationType,
		note?: GenericId,
		user?: GenericId,
		relationship?: GenericId
	) {
		let sender = await UserService.get({ id: from });
		let recipient = await UserService.get({ id: to });

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

		let notification = {
			id: IdService.generate(),
			toId: recipient.id,
			fromId: sender.id,
			type: type,
			read: false,
			createdAt: new Date().toISOString()
		};

		let grabbedNote = await NoteService.get({ id: note });
		if (grabbedNote) notification['noteId'] = grabbedNote.id;

		let grabbedUser = await UserService.get({ id: user });
		if (grabbedUser) notification['userId'] = grabbedUser.id;

		let grabbedRelationship = await RelationshipService.get({
			id: relationship
		});
		if (grabbedRelationship)
			notification['relationshipId'] = grabbedRelationship.id;

		db.getRepository('notification').create();
	}
}

export default new NotificationService();
