import https from '$lib/https';

export default function getUserNotes(id: string, since?: string) {
	return https.get(
		`/api/user/${id}/notes` + (since ? '?since=' + since : ''),
		true
	);
}
