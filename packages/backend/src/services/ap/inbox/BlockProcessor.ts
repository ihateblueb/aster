import RelationshipService from '../../RelationshipService.js';
import UserService from '../../UserService.js';
import ApActorService from '../ApActorService.js';

class BlockProcessor {
	public async process(body: ApObject): Promise<boolean> {
		if (!body.actor) return false;
		if (!body.object) return false;

		const actor = await ApActorService.get(body.actor);
		if (!actor) return false;

		const object = await UserService.get({ apId: body.object });
		if (!object) return false;
		if (!object.local) return false;

		const existingRelationshipTo = await RelationshipService.get({
			to: { id: object.id },
			from: { apId: actor.id }
		});
		const existingRelationshipFrom = await RelationshipService.get({
			to: { id: object.id },
			from: { apId: actor.id }
		});

		if (existingRelationshipTo)
			await RelationshipService.delete({ id: existingRelationshipTo.id });
		if (existingRelationshipFrom)
			await RelationshipService.delete({
				id: existingRelationshipFrom.id
			});

		return await RelationshipService.create(
			object.id,
			actor.id,
			'block',
			false
		).then(() => {
			return true;
		});
	}
}

export default new BlockProcessor();
