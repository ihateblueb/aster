import https from '$lib/https';

export default function createNote(body) {
	return https.post(`/api/note`, body);
}
