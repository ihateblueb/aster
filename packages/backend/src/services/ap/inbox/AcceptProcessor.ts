import NotificationService from '../../NotificationService.js';
import RelationshipService from '../../RelationshipService.js';
import UserService from '../../UserService.js';
import ApActorService from '../ApActorService.js';

class AcceptProcessor {
	public async process(body: ApObject): Promise<boolean> {
		if (!body.actor) return false;
		if (!body.object && !body.object.type) return false;

		if (body.object.type === 'Follow') {
			if (!body.object.actor || !body.object.object) return false;

			const to = await ApActorService.get(body.actor);
			if (!to) throw new Error('Actor not found');

			const from = await UserService.get({ apId: body.object.actor });
			if (!from) return false;

			console.log(
				{
					to: { id: to.id },
					from: { id: from.id }
				},
				{
					pending: false
				}
			);

			const relationship = await RelationshipService.get({
				to: { id: to.id },
				from: { id: from.id }
			});

			if (!relationship) return false;

			return await RelationshipService.update(
				{
					to: { id: to.id },
					from: { id: from.id }
				},
				{
					pending: false
				}
			)
				.then(async () => {
					await NotificationService.create(
						from.id,
						to.id,
						'acceptedFollow',
						undefined,
						undefined,
						relationship ? relationship.id : undefined
					);

					return true;
				})
				.catch((err) => {
					console.log(err);
					return false;
				});
		}
	}
}

export default new AcceptProcessor();
