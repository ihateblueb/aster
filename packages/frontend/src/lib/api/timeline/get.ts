import Store from '$lib/utils/Store';

export default async function timelineGet(timeline: string) {
	let timelineRes = {};

	var timelineReq = await fetch(`/api/v1/timeline/${timeline}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${Store.get('a_token')}`
		}
	});

	timelineRes = await timelineReq.json();

	if (timelineReq.status === 200) {
		console.log(timelineRes);
	} else {
		console.log(timelineRes);
	}

	return timelineRes;
}
