import Store from '$lib/scripts/Store';

export default async function noteReport(
	noteId: String,
	reportContent: String
) {
	let noteRes = {};

	var noteReq = await fetch(`/api/v1/note/${noteId}/report`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${Store.get('a_token')}`
		},
		body: JSON.stringify({
			content: reportContent
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
