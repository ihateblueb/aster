import UserService from '../UserService.js';
import ApActorService from './ApActorService.js';

class ApVisibilityService {
	private asPublic = 'https://www.w3.org/ns/activitystreams#Public';

	public async determine(body) {
		const creator = await ApActorService.get(
			body.attributedTo ? body.attributedTo : body.actor
		);
		if (!creator)
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

		const filteredTo = body.to
			.filter((e) => {
				return e !== this.asPublic;
			})
			.filter((e) => {
				return e !== creator.followersUrl;
			});
		const filteredCc = body.cc
			.filter((e) => {
				return e !== this.asPublic;
			})
			.filter((e) => {
				return e !== creator.followersUrl;
			});

		console.log('filteredTo', filteredTo);
		console.log('filteredCc', filteredCc);

		const toIds: string[] = [];

		for (const item of filteredTo) {
			const actor = await ApActorService.get(item);
			if (actor) toIds.push(actor.id);
		}

		for (const item of filteredCc) {
			const actor = await ApActorService.get(item);
			if (actor) toIds.push(actor.id);
		}

		console.log({
			visibility: visibility,
			to: toIds
		});

		return {
			visibility: visibility,
			to: toIds
		};
	}

	public async render(user, object) {
		const grabbedUser = await UserService.get({ id: user });

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
				cc: [this.asPublic]
			};

		if (object.visibility === 'direct') {
			// todo: make MfmService
			/* todo: for each mention, WebfingerService.get(@user@host)
                     return UserService.get after ApActorService.get of it
                     UserService fallback WebfingerService?
                     then for each actor apId, push to "to"
                     alternatively: determine on NoteService.create? store in db?
                     do that instead.
            */
			return {
				to: [],
				cc: []
			};
		}
	}
}

export default new ApVisibilityService();
