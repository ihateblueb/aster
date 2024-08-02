import Store from '$lib/utils/Store';

export default async function driveFileAdd(file: File) {
	let driveFileRes = {};

	var driveFileReq = await fetch(`/api/v2/drive/file/${file.name}`, {
		method: 'POST',
		headers: {
			'Content-Type': file.type,
			Accept: 'application/json',
			Authorization: `Bearer ${Store.get('a_token')}`
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
