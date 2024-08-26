import localstore from '$lib/utils/localstore';

export default async function driveFileAdd(file: File) {
	let driveFileRes = {};

	let driveFileReq = await fetch(`/api/v2/drive/file/${file.name}`, {
		method: 'POST',
		headers: {
			'Content-Type': file.type,
			Accept: 'application/json',
			Authorization: `Bearer ${localstore.get('a_token')}`
		},
		body: file
	});

	driveFileRes = await driveFileReq.json();

	if (driveFileReq.status === 200) {
		console.log(driveFileRes);
	} else {
		console.log(driveFileRes);
	}

	return driveFileRes;
}
