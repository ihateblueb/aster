import processNewNote from '../processNewNote.js';

export default async function IPCreate(body) {
	if (body.type === 'Note') {
		await processNewNote(body.object);
	}
}
