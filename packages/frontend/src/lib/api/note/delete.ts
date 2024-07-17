import Store from '$lib/utils/Store';

export default async function noteDelete(noteId: string) {
	let noteRes = {};

	var noteReq = await fetch(`/api/v2/note`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${Store.get('a_token')}`
		},
		body: JSON.stringify({
			id: noteId
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
