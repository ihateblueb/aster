import Store from '$lib/utils/Store';

export default async function driveFileGet(id: string) {
	let driveFileRes = {};

	var driveFileReq = await fetch(`/api/v2/drive/file/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${Store.get('a_token')}`
		}
	});

	driveFileRes = await driveFileReq.json();

	if (driveFileReq.status === 200) {
		console.log(driveFileRes);
	} else {
		console.log(driveFileRes);
	}

	return driveFileRes;
}