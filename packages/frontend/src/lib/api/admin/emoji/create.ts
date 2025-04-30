import https from '$lib/https';

export default function createEmoji(body: any) {
	return https.post(`/api/admin/emoji`, body);
}
