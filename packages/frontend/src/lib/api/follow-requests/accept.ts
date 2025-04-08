import https from '$lib/https';

export default async function acceptFollowRequest(id: string) {
	return await https.post(`/api/follow-request/${id}/accept`);
}
