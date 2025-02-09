import https from '$lib/https';

export default function getNoteContext(id: string) {
	return https.get(`/api/note/${id}/context`, true);
}
