import { v4 as uuidv4 } from 'uuid';
import db from '../utils/database.js';
import notification from '../utils/notification.js';
import logger from '../utils/logger.js';

class RelationshipService {
	public async get(to: string, from: string) {
		return await db
			.getRepository('relationship')
			.find({ where: { to: to, from: from } });
	}

	public async create(to: string, from: string) {
		if (to === from) {
			return {
				status: 400,
				message: 'You cannot follow yourself'
			};
		}

		let grabbedUserTo = await db.getRepository('relationship').findOne({
			where: {
				id: to
			}
		});
		let grabbedUserFrom = await db.getRepository('relationship').findOne({
			where: {
				id: from
			}
		});

		if (await this.get(to, from)) {
			return {
				status: 400,
				message: 'Relationship already exists'
			};
		} else {
			if (grabbedUserTo.local) {
				if (grabbedUserTo.locked) {
					let relationshipToInsert = {};

					const relationshipId = uuidv4();

					relationshipToInsert['id'] = relationshipId;
					relationshipToInsert['created_at'] = new Date(
						Date.now()
					).toISOString();
					relationshipToInsert['to'] = grabbedUserTo.id;
					relationshipToInsert['from'] = grabbedUserFrom.id;
					relationshipToInsert['pending'] = true;

					await db
						.getRepository('relationship')
						.insert(relationshipToInsert);

					await notification.create(
						grabbedUserTo.id,
						grabbedUserFrom.id,
						'followrequest',
						relationshipId
					);

					logger.debug(
						'relationship',
						'created pending relationship to ' +
							to +
							' from ' +
							from
					);

					return {
						status: 200,
						message: 'Sent follow request'
					};
				} else {
					let relationshipToInsert = {};

					const relationshipId = uuidv4();

					relationshipToInsert['id'] = relationshipId;
					relationshipToInsert['created_at'] = new Date(
						Date.now()
					).toISOString();
					relationshipToInsert['to'] = grabbedUserTo.id;
					relationshipToInsert['from'] = grabbedUserFrom.id;

					await db
						.getRepository('relationship')
						.insert(relationshipToInsert);

					await notification.create(
						grabbedUserTo.id,
						grabbedUserFrom.id,
						'follow',
						relationshipId
					);

					logger.debug(
						'relationship',
						'created relationship to ' + to + ' from ' + from
					);

					return {
						status: 200,
						message: 'Follow successful'
					};
				}
			} else {
				return {
					status: 501,
					message: 'Remote follows not implemented'
				};
			}
		}
	}

	public async delete(to: string, from: string) {
		logger.debug(
			'relationship',
			'deleted relationship to ' + to + ' from ' + from
		);
		return await db
			.getRepository('relationship')
			.delete({ where: { to: to, from: from } });
	}
}

export default new RelationshipService();
