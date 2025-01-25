import https from '$lib/https';

export default async function upload(data: any) {
	return await https.postRaw('/upload', data);
}
