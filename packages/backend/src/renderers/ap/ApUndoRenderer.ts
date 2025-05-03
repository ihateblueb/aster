import ConfigService from '../../services/ConfigService.js';
import IdService from '../../services/IdService.js';
import context from '../../static/context.js';

class ApUndoRenderer {
	public render(object: ApObject): ApObject {
		let undo = {
			'@context': context,

			'type': 'Undo',
			'id': ConfigService.url.href + 'activities/' + IdService.generate(),
			'object': object
		};

		if (object.actor) undo['actor'] = object.actor;

		return undo;
	}
}

export default new ApUndoRenderer();
