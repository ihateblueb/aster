import https from '$lib/https';

export default function editEmoji(id: string, body: any) {
	return https.patch(`/api/admin/emoji/${id}`, body);
}
