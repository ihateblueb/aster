import context from '../../static/context.js';
import ConfigService from '../ConfigService.js';
import IdService from '../IdService.js';

class ApUpdateRenderer {
	public render(object: ApObject): ApObject {
		return {
			'@context': context,

			'type': 'Update',
			'id': ConfigService.url.href + 'activities/' + IdService.generate(),
			'object': object
		};
	}
}

export default new ApUpdateRenderer();
