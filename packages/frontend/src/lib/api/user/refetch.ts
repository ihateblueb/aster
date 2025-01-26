import https from '$lib/https';

export default function refetchUser(id: string) {
	return https.post(`/api/user/${id}/refetch`);
}
