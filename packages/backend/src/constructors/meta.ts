import { Meta } from '../entities/Meta.js';

export default class ApiMeta {
	name: string = 'Aster';
	created_at?: string;
	color: string = '#9c8cff';

	maintainer?: string;
	maintainer_email?: string;
	registration: string = 'open';
	rules?: object;

	description: string = 'A fediverse instance running Aster';
	description_long: string = 'A fediverse instance running Aster';

	local_user_count: number;
	total_user_count: number;
	local_note_count: number;
	total_note_count: number;
	instance_count: number;

	constructor(
		grabbedMeta?: Meta,
		grabbedLocalUserCount?,
		grabbedTotalUserCount?,
		grabbedLocalNoteCount?,
		grabbedTotalNoteCount?,
		grabbedInstanceCount?
	) {
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
		}

		this.local_user_count = grabbedLocalUserCount
			? grabbedLocalUserCount
			: 0;
		this.total_user_count = grabbedTotalUserCount
			? grabbedTotalUserCount
			: 0;
		this.local_note_count = grabbedLocalNoteCount
			? grabbedLocalNoteCount
			: 0;
		this.total_note_count = grabbedTotalNoteCount
			? grabbedTotalNoteCount
			: 0;
		this.instance_count = grabbedInstanceCount ? grabbedInstanceCount : 0;
	}

	build() {
		return this;
	}
}
