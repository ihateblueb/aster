import https from '$lib/https';

export default function getAdminMeta() {
	return https.get(`/api/admin/meta`, true);
}
