import UserService from "../UserService";
import ApResolver from "./ApResolver";

class ApActorService {
	public async get(apId: string | URL) {
        let uri = new URL(apId);

        let actor = await UserService.get({ apId: apId });

        if (actor) return actor;

        // let resolvedActor = await ApResolver.resolve(apId);
        // todo: if resolved, register or update and then return as db entity

        return;
    }
}

export default new ApActorService();
