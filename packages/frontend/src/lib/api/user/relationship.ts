import https from '$lib/https';

export default function getUserRelationship(id: string) {
	return https.get(`/api/user/${id}/relationship`, true);
}
