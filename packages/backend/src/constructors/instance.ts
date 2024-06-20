import { Instances } from '../entities/Instance.js';

export default async function buildInstance(grabbedInstance) {
	grabbedInstance = new Instances();
	var instanceJson = {};

	instanceJson['id'] = grabbedInstance.id;
	instanceJson['host'] = grabbedInstance.host;
	instanceJson['name'] = grabbedInstance.name;
	instanceJson['description'] = grabbedInstance.description;
	instanceJson['color'] = grabbedInstance.color;
	instanceJson['software'] = grabbedInstance.software;
	instanceJson['version'] = grabbedInstance.version;
	instanceJson['icon'] = grabbedInstance.icon;
	instanceJson['maintainer'] = grabbedInstance.maintainer;
	instanceJson['maintainer_email'] = grabbedInstance.maintainer_email;
	instanceJson['created_at'] = grabbedInstance.created_at;
	instanceJson['updated_at'] = grabbedInstance.updated_at;
	instanceJson['last_communicated'] = grabbedInstance.last_communicated;
	instanceJson['responding'] = grabbedInstance.responding;
	instanceJson['user_count'] = grabbedInstance.user_count;
	instanceJson['note_count'] = grabbedInstance.note_count;
	instanceJson['suspended'] = grabbedInstance.suspended;
	instanceJson['silenced'] = grabbedInstance.silenced;
	instanceJson['mod_note'] = grabbedInstance.mod_note;

	return instanceJson;
}
