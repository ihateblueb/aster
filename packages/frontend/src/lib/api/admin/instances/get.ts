import { http } from '$lib/api/http';

export default async function adminInstancesGet() {
	return new http().get(`/api/v2/admin/instances`);
}
