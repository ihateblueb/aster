import { Notification } from '../../../entities/Notification.js';
import NotificationService from '../../NotificationService.js';
import RelationshipService from '../../RelationshipService.js';
import UserService from '../../UserService.js';
import ApActorService from '../ApActorService.js';

class AcceptProcessor {
	public async process(body): Promise<boolean> {
		console.log(body);

		/*type: 'Accept',
  actor: 'https://booping.synth.download/users/9zzn79zrftdt02ak',
  object: {
    id: 'https://dev.aster.pages.gay/activities/0a1k8Qfozd6gUnjca1jf1o2wQQQ1',
    type: 'Follow',
    actor: 'https://dev.aster.pages.gay/users/01926e83-e61a-7ff6-a8d9-b7fb4bb8297a',
    object: 'https://booping.synth.download/users/9zzn79zrftdt02ak'
  },
  id: 'https://booping.synth.download/14ea3e14-ea6e-499b-81eb-05f84f4856ad'*/

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
