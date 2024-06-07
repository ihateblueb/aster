import Store from '$lib/scripts/Store';

export default async function noteBookmark(noteId: String) {
	let noteRes = {};

	var noteReq = await fetch(`/api/v1/note/${noteId}/bookmark`, {
		method: 'POST',
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

	return noteRes;
}
