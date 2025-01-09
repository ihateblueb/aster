import logger from '../../../utils/logger.js';
import LikeService from '../../LikeService.js';
import RelationshipService from '../../RelationshipService.js';
import UserService from '../../UserService.js';
import ApActorService from '../ApActorService.js';

class UndoProcessor {
	private async undoAnnounce(body: ApObject): Promise<boolean> {
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

		return await RelationshipService.delete({
			to: {
				id: object.id
			},
			from: {
				id: actor.id
			}
		}).then(() => {
			return true;
		});
	}
	private async undoLike(body: ApObject): Promise<boolean> {
		if (!body.actor) return false;
		if (!body.object) return false;

		const actor = await ApActorService.get(body.actor);
		if (!actor) throw new Error('Actor not found');

		const object = await UserService.get({ apId: body.object });
		if (!object) return false;
		if (!object.local) return false;

		return await LikeService.delete({
			user: { id: actor.id },
			note: { id: object.id }
		}).then(() => {
			return true;
		});
	}

	public async process(body: ApObject): Promise<boolean> {
		if (!body.object.type) return false;

		if (body.object.type === 'Follow') {
			return await this.undoFollow(body.object);
		} else if (body.object.type === 'Like') {
			return await this.undoLike(body.object);
		} else {
			logger.warn(
				'update',
				'unprocessed undo object type ' + body.object.type
			);
		}

		return false;
	}
}

export default new UndoProcessor();
