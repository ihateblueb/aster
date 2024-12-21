import context from '../../static/context.js';
import config from '../../utils/config.js';
import IdService from '../IdService.js';

class ApUndoRenderer {
	public render(object: ApObject): ApObject {
		let undo = {
			'@context': context,

			type: 'Undo',
			id: new URL(config.url).href + 'activities/' + IdService.generate(),
			object: object
		};

		if (object.actor) undo['actor'] = object.actor;

		return undo;
	}
}

export default new ApUndoRenderer();
