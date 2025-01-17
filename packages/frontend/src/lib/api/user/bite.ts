import https from '$lib/https';

export default function biteUser(id: string) {
	return https.post(`/api/user/${id}/bite`);
}
