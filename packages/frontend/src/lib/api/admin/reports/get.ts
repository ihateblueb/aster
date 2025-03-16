import https from '$lib/https';

export default function getAdminReports(since?: string) {
	return https.get(
		`/api/admin/reports` + (since ? '?since=' + since : ''),
		true
	);
}
