import { http } from '$lib/api/http';

export default async function timelineUserGet(user: string) {
	return new http().get(`/api/v2/user/${user}/timeline`);
}
