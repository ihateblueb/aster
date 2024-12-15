import https from '$lib/https';

export default function getAdminFederationRules() {
	return https.get(`/api/admin/federation/rules`, true);
}
