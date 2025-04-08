import https from '$lib/https';

export default async function rejectFollowRequest(id: string) {
	return await https.post(`/api/follow-request/${id}/reject`);
}
