import https from '$lib/https';

export default function editMeta(body: any) {
	return https.patch(`/api/meta`, body);
}
