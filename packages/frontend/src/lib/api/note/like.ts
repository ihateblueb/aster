import https from '$lib/https';

export default function likeNote(note) {
	return https.post(`/api/note/${note}/like`);
}
