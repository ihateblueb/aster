import context from '../../static/context.js';
import ConfigService from '../ConfigService.js';
import IdService from '../IdService.js';

class ApUpdateRenderer {
	public render(object: ApObject): ApObject {
		let undo = {
			'@context': context,

			type: 'Update',
			id: ConfigService.url.href + 'activities/' + IdService.generate(),
			object: object
		};

		return undo;
	}
}

export default new ApUpdateRenderer();
