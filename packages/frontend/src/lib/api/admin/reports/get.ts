import https from '$lib/https';

export default function getAdminReports() {
	return https.get(`/api/admin/reports`, true);
}
