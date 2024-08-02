export default class ApiMeta {
	name: string;
	created_at: string;
	color: string;

	maintainer?: string;
	maintainer_email?: string;
	registration: string = 'open';
	rules?: object;

	description: string;
	description_long: string;

	local_user_count: number;
	total_user_count: number;
	local_note_count: number;
	total_note_count: number;
	instance_count: number;

	constructor(
		grabbedMeta?,
		grabbedLocalUserCount?,
		grabbedTotalUserCount?,
		grabbedLocalNoteCount?,
		grabbedTotalNoteCount?,
		grabbedInstanceCount?
	) {
		if (grabbedMeta) {
			this.name = grabbedMeta.name ? grabbedMeta.name : 'Aster';
			this.created_at = grabbedMeta.created_at;
			this.color = grabbedMeta.color ? grabbedMeta.color : '#9c8cff';

			this.maintainer = grabbedMeta.maintainer;
			this.maintainer_email = grabbedMeta.maintainer_email;
			this.registration = grabbedMeta.registration;
			this.rules = grabbedMeta.rules;

			this.description = grabbedMeta.description
				? grabbedMeta.description
				: 'A fediverse instance running Aster';
			this.description_long = grabbedMeta.description_long
				? grabbedMeta.description_long
				: 'A fediverse instance running Aster';
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
