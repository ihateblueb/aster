import Store from '$lib/utils/Store';

export default async function driveGet() {
	let driveRes = {};

	var driveReq = await fetch(`/api/v2/drive`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${Store.get('a_token')}`
		}
	});

	driveRes = await driveReq.json();

	if (driveReq.status === 200) {
		console.log(driveRes);
	} else {
		console.log(driveRes);
	}

	return driveRes;
}
