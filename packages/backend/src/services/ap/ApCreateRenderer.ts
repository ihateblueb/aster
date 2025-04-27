import context from '../../static/context.js';

class ApCreateRenderer {
	public render(note: ApObject): ApObject {
		return {
			'@context': context,

			'type': 'Create',
			'id': note.id + '/activity',
			'actor': note.actor,
			'object': note
		};
	}
}

export default new ApCreateRenderer();
