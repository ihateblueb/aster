import https from '$lib/https';

export default function updateAdminFederationRules(body) {
	return https.post(`/api/admin/federation/rules`, body);
}
