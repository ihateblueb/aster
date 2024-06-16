import buildUser from './user.js';

export default async function buildNote(grabbedNote, grabbedAuthor) {
	var noteJson = {};

	noteJson['id'] = grabbedNote.id;
	noteJson['local'] = grabbedNote.local;
	noteJson['visibility'] = grabbedNote.visibility;

	noteJson['author'] = buildUser(grabbedAuthor);

	noteJson['cw'] = grabbedNote.cw;
	noteJson['content'] = grabbedNote.content;
	noteJson['created_at'] = grabbedNote.created_at;

	return noteJson;
}
