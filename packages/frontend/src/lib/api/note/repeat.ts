import localstore from '$lib/utils/localstore';

export default async function noteRepeat(noteId: string) {
	let noteRes = {};

	let noteReq = await fetch(`/api/v2/note/${noteId}/repeat`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${localstore.get('a_token')}`
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
