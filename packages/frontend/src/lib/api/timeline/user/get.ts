import Store from '$lib/utils/Store';

export default async function timelineUserGet(user: string) {
	let timelineRes = {};

	let timelineReq = await fetch(`/api/v2/user/${user}/timeline`, {
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
