import RelationshipService from '../../RelationshipService.js';
import UserService from '../../UserService.js';
import ApActorService from '../ApActorService.js';

class UndoProcessor {
	private async undoAnnounce(body: ApObject): Promise<boolean> {
		return false;
	}
	private async undoCreate(body: ApObject): Promise<boolean> {
		return false;
	}
	private async undoFollow(body: ApObject): Promise<boolean> {
		if (!body.actor) return false;
		if (!body.object) return false;

		const actor = await ApActorService.get(body.actor);
		if (!actor) throw new Error('Actor not found');

		const object = await UserService.get({ apId: body.object });
		if (!object) return false;
		if (!object.local) return false;

		await RelationshipService.delete({
			to: {
				id: object.id
			},
			from: {
				id: actor.id
			}
		});

		return true;
	}
	private async undoLike(body: ApObject): Promise<boolean> {
		return false;
	}

	public async process(body: ApObject): Promise<boolean> {
		if (!body.object.type) return false;

		if (body.object.type === 'Follow') {
			return await this.undoFollow(body.object);
		}

		return false;
	}
}

export default new UndoProcessor();
