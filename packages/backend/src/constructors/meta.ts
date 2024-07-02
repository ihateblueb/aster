import { Meta } from '../entities/Meta.js';

export default class ApiMeta {
	name: string = 'Aster';
	created_at?: string;
	color: string = '#9c8cff';

	maintainer?: string;
	maintainer_email?: string;
	registration: string = 'closed';
	rules?: object;

	description: string = 'A fediverse instance running Aster';
	description_long: string = 'A fediverse instance running Aster';

	local_user_count: number = 0;
	total_user_count: number = 0;
	local_note_count: number = 0;
	total_note_count: number = 0;
	instance_count: number = 0;

	constructor(grabbedMeta?: Meta) {
		if (grabbedMeta) {
			this.name = grabbedMeta.name;
			this.created_at = grabbedMeta.created_at;
			this.color = grabbedMeta.color;

			this.maintainer = grabbedMeta.maintainer;
			this.maintainer_email = grabbedMeta.maintainer_email;
			this.registration = grabbedMeta.registration;
			this.rules = grabbedMeta.rules;

			this.description = grabbedMeta.description;
			this.description_long = grabbedMeta.description_long;

			this.local_user_count = grabbedMeta.local_user_count;
			this.total_user_count = grabbedMeta.total_user_count;
			this.local_note_count = grabbedMeta.local_note_count;
			this.total_note_count = grabbedMeta.total_note_count;
			this.instance_count = grabbedMeta.instance_count;
		}
	}

	build() {
		return this;
	}
}
