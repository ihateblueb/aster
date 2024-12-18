import https from '$lib/https';

export default function deleteNote(note) {
	return https.delete(`/api/note/${note}`);
}
