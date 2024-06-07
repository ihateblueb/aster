import Store from '$lib/scripts/Store';

export default async function noteReact(noteId: String, reaction?: String) {
	let noteRes = {};

	var noteReq = await fetch(`/api/v1/note/${noteId}/react`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${Store.get('a_token')}`
		},
		body: JSON.stringify({
			reaction: reaction
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
