import Store from '$lib/utils/Store';

export default async function noteUnpin(noteId: string) {
	let noteRes = {};

	var noteReq = await fetch(`/api/v2/note/${noteId}/unpin`, {
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
