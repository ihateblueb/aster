import ConfigService from '../../services/ConfigService.js';
import IdService from '../../services/IdService.js';
import context from '../../static/context.js';

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
