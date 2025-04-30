import https from '$lib/https';

export default function deleteEmoji(id: string) {
	return https.delete(`/api/admin/emoji/${id}`);
}
