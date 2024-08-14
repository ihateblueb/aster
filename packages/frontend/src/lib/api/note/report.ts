import Store from '$lib/utils/Store';

export default async function noteReport(
	noteId: string,
	reportContent: string
) {
	let noteRes = {};

	let noteReq = await fetch(`/api/v2/note/${noteId}/report`, {
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
