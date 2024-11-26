import UserService from "../UserService.js";
import ApActorService from "./ApActorService.js";

class ApVisibilityService {
    private asPublic = 'https://www.w3.org/ns/activitystreams#Public'
	public async determine(body) {
        let creator = await ApActorService.get(
			body.attributedTo ? body.attributedTo : body.actor
		);
        if (!creator) return 'direct';

        let visibility = 'direct';

        if (body.to.includes(creator.followersUrl) && !body.to.includes(this.asPublic))
			visibility = 'followers';

        if (body.to.includes(creator.followersUrl) && body.cc.includes(this.asPublic))
			visibility = 'unlisted';

        if (body.to.includes(this.asPublic))
			visibility = 'public';

        // aster:visibility
        if (['public', 'unlisted', 'followers', 'direct'].includes(body.visibility)) visibility = body.visibility;

        // todo: if OrderedCollection of actors exists in to, resolve actors and make direct to those actors
        return visibility;
	}

    public async render(user, note) {
        let grabbedUser = await UserService.get({ id: user })

        if (note.visibility === 'public') return {
            to: [this.asPublic],
            cc: []
        }
        if (note.visibility === 'unlisted') return {
            to: [grabbedUser.followersUrl],
            cc: [this.asPublic]
        }
        if (note.visibility === 'followers') return {
            to: [grabbedUser.followersUrl],
            cc: [this.asPublic]
        }

        if (note.visibility === 'direct') {
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
            }
        }
    }
}

export default new ApVisibilityService();
