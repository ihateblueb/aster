import localstore from '$lib/utils/localstore';

export default async function noteReact(noteId: string, reaction: string) {
	let noteRes = {};

	let noteReq = await fetch(`/api/v2/note/${noteId}/react`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${localstore.get('a_token')}`
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
