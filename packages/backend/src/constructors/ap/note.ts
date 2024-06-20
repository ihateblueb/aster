import contexts from '../../../static/contexts.json' with { type: 'json' };
import config from '../../utils/config.js';

export default async function buildApNote(grabbedNote) {
	let noteJson = {
		'@context': ['https://www.w3.org/ns/activitystreams', contexts],
		published: '',
		visibility: '',
		to: [],
		cc: []
	};

	noteJson['id'] = config.url + 'notes/' + grabbedNote.id;
	noteJson['type'] = 'Note';
	noteJson['attributedTo'] = config.url + 'users/' + grabbedNote.author;

	noteJson['content'] = grabbedNote.content;
	noteJson['source'] = {
		content: grabbedNote.content,
		mediaType: 'text/x.misskeymarkdown'
	};

	noteJson['published'] = grabbedNote.created_at;

	// aster:Visibility extension
	noteJson['visibility'] = grabbedNote.visibility;

	if (grabbedNote.visibility === 'public') {
		noteJson['to'] = ['https://www.w3.org/ns/activitystreams#Public'];
	} else if (grabbedNote.visibility === 'unlisted') {
		noteJson['to'] = ['https://www.w3.org/ns/activitystreams#Public'];
		noteJson['cc'] = [`${config.url}users/${grabbedNote.author}/followers`];
	} else if (grabbedNote.visibility === 'followers') {
		noteJson['cc'] = [`${config.url}users/${grabbedNote.author}/followers`];
	}
	// TODO: add direct later

	noteJson['inReplyTo'] = grabbedNote.replying_to;

	return noteJson;
}
