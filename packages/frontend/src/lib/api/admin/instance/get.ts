import { http } from '$lib/api/http';

export default async function adminInstanceGet(host: string) {
	return new http().get(`/api/v2/admin/instance/` + host);
}
