import https from '$lib/https';

export default function reactNote(note, emoji) {
	return https.post(`/api/note/${note}/react`, {
		emoji: emoji
	});
}
