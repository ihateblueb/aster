export default class ApiNotification {
	id: string;

	type: string;

	to: object;
	from?: object;

	created_at: string;

	object?: object;
	reaction?: object;

	constructor(
		grabbedNotification,
		grabbedTo,
		grabbedFrom?,
		grabbedReaction?
	) {
		this.id = grabbedNotification.id;
		this.type = grabbedNotification.type;
		this.created_at = grabbedNotification.created_at;

		this.to = grabbedTo;

		if (grabbedFrom) {
			this.from = grabbedFrom;
		}

		if (grabbedNotification.object) {
			this.object = grabbedNotification.object;
		}

		if (grabbedReaction) {
			this.reaction = grabbedReaction;
		}
	}

	build() {
		return this;
	}
}
