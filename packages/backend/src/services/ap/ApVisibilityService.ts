import UserService from '../UserService.js';
import ApActorService from './ApActorService.js';

class ApVisibilityService {
	private asPublic = 'https://www.w3.org/ns/activitystreams#Public';

	public async determine(body) {
		if (!body.actor && !body.attributedTo)
			return {
				visibility: 'direct',
				to: undefined
			};

		const creator = await ApActorService.get(
			body.attributedTo ? body.attributedTo : body.actor
		);
		if (!creator)
			return {
				visibility: 'direct',
				to: undefined
			};

		if (!body.to && !body.cc)
			return {
				visibility: 'direct',
				to: undefined
			};

		let visibility = 'direct';

		if (
			body.to.includes(creator.followersUrl) &&
			!body.to.includes(this.asPublic)
		)
			visibility = 'followers';

		if (
			body.to.includes(creator.followersUrl) &&
			body.cc.includes(this.asPublic)
		)
			visibility = 'unlisted';

		if (body.to.includes(this.asPublic)) visibility = 'public';

		// aster:visibility
		if (
			['public', 'unlisted', 'followers', 'direct'].includes(
				body.visibility
			)
		)
			visibility = body.visibility;

		let toIds: string[] = [];

		if (body.to && Array.isArray(body.to)) {
			const filteredTo = body.to
				.filter((e) => {
					return e !== this.asPublic;
				})
				.filter((e) => {
					return e !== creator.followersUrl;
				});

			for (const item of filteredTo) {
				const actor = await ApActorService.get(item);
				if (actor) toIds.push(actor.id);
			}
		}

		if (body.cc && Array.isArray(body.cc)) {
			const filteredCc = body.cc
				.filter((e) => {
					return e !== this.asPublic;
				})
				.filter((e) => {
					return e !== creator.followersUrl;
				});

			for (const item of filteredCc) {
				const actor = await ApActorService.get(item);
				if (actor) toIds.push(actor.id);
			}
		}

		if (toIds.length === 0) toIds = undefined;

		return {
			visibility: visibility,
			to: toIds
		};
	}

	public async render(user, object) {
		const grabbedUser = await UserService.get({ id: user });

		if (!grabbedUser)
			return {
				to: [],
				cc: []
			};

		if (object.visibility === 'public')
			return {
				to: [this.asPublic],
				cc: []
			};
		if (object.visibility === 'unlisted')
			return {
				to: [grabbedUser.followersUrl],
				cc: [this.asPublic]
			};
		if (object.visibility === 'followers')
			return {
				to: [grabbedUser.followersUrl],
				cc: []
			};

		if (object.visibility === 'direct') {
			// todo: take to column, find their apIds, add, all good
			return {
				to: [],
				cc: []
			};
		}
	}
}

export default new ApVisibilityService();
