import Store from '$lib/scripts/Store';

export default async function noteCreate(noteCw: String, noteContent: String) {
	let noteRes = {};

	var noteReq = await fetch(`/api/v1/note`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${Store.get('a_token')}`
		},
		body: JSON.stringify({
			cw: noteCw,
			content: noteContent
		})
	});

	noteRes = await noteReq.json();

	if (noteReq.status === 200) {
		console.log(noteRes);
	} else {
		console.log(noteRes);
	}

	return noteRes;
}