import https from '$lib/https';

export default function getNote(id: string) {
	return https.get(`/api/note/${id}`, true);
}
