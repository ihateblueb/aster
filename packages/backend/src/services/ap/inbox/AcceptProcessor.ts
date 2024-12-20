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
			const from = await UserService.get({ apId: body.object.actor });

			if (!to) return false;

			await RelationshipService.update(
				{
					to: { id: to.id },
					from: { id: from.id }
				},
				{
					pending: false
				}
			).catch((err) => {
				console.log(err);
			});

			await NotificationService.create(
				from.id,
				to.id,
				'acceptedFollow',
				undefined,
				undefined,
				(
					await RelationshipService.get({
						to: { id: to.id },
						from: { id: from.id }
					})
				).id
			);

			return true;
		}
	}
}

export default new AcceptProcessor();
