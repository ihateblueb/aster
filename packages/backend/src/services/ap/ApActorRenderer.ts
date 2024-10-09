import context from "../../static/context.js";

class ApActorRenderer {
	public render(user) {
		let apActor = {
            context,
			type: user.automated ? 'Service' : 'Person'
		};

		return apActor;
	}
}

export default new ApActorRenderer();
