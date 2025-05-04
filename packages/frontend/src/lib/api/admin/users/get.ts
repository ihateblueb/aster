import https from '$lib/https';

export default function getAdminUsers(since?: string) {
	return https.get(
		`/api/admin/users` + (since ? '?since=' + since : ''),
		true
	);
}
