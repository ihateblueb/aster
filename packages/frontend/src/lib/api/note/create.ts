import Store from '$lib/utils/Store';

export default async function noteCreate(
	noteCw: string,
	noteContent: string,
	visibility: string
) {
	let noteRes = {};

	let noteReq = await fetch(`/api/v2/note`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${Store.get('a_token')}`
		},
		body: JSON.stringify({
			cw: noteCw,
			content: noteContent,
			visibility: visibility
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
