import https from '$lib/https';

export default function createNote(note) {
	return https.post(`/api/note/${note}/repeat`, {
		visibility: 'public'
	});
}
