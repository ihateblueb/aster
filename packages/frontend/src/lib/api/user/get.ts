import https from '$lib/https';

export default function getUser(id: string) {
	return https.get(`/api/user/${id}`, true);
}
