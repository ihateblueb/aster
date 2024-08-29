import { http } from '$lib/api/http';
import localstore from '$lib/utils/localstore';

export default async function adminFederationGet() {
	return new http().get(`/api/v2/admin/federation`);
}
