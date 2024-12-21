import https from '$lib/https';

export default function repeatNote(note) {
	return https.post(`/api/note/${note}/repeat`, {
		visibility: 'public'
	});
}
