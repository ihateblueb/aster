import Store from '$lib/utils/Store';

export async function load({ params }) {
	let noteRes = {};

	var noteReq = await fetch(`/api/v1/followrequests`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${Store.get('a_token')}`
		}
	});

	noteRes = await noteReq.json();

	if (noteReq.status === 200) {
		console.log(noteRes);
	} else {
		console.log(noteRes);
	}

	let data = noteRes;

	return data;
}
