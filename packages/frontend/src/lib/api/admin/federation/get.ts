import { http } from '$lib/api/http';

export default async function adminFederationGet() {
	return new http().get(`/api/v2/admin/federation`);
}
