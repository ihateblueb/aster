import https from '$lib/https';

export default async function upload(data: any) {
	return await https.post('/upload', data, true);
}
