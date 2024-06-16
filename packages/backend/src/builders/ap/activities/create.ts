import contexts from '../../../../static/contexts.json' with { type: 'json' };
import config from '../../../utils/config.js';
import buildApNote from '../note.js';
import { v4 as uuidv4 } from 'uuid';

export default async function buildApActivityCreate(grabbedLocalUser, type, object) {
	if (type === 'note') {
		var grabbedNote = await buildApNote(object)
		var outgoingNoteJson = {
			"@context": [
				"https://www.w3.org/ns/activitystreams",
				contexts
			],
			"type": "Create"
		}

		outgoingNoteJson['actor'] = config.url + 'users/' + grabbedLocalUser.id;
		outgoingNoteJson['cc'] = grabbedNote.cc;
		outgoingNoteJson['id'] = config.url + 'activities/' + uuidv4();
		outgoingNoteJson['object'] = grabbedNote;
		outgoingNoteJson['published'] = grabbedNote.published;
		outgoingNoteJson['to'] = grabbedNote.to;

		return outgoingNoteJson;
	}
}
