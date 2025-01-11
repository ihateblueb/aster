import https from '$lib/https';

export default function followUser(id: string) {
	return https.post(`/api/user/${id}/follow`);
}
