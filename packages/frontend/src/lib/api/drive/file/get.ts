import localstore from '$lib/utils/localstore';

export default async function driveFileGet(id: string) {
	let driveFileRes = {};

	let driveFileReq = await fetch(`/api/v2/drive/file/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${localstore.get('a_token')}`
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
