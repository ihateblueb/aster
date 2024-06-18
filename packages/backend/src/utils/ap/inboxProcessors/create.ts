import processNewNote from '../processNewNote.js';

export default async function IPCreate(body) {
	if (body.object.type === 'Note') {
		await processNewNote(body.object);
	}
}
