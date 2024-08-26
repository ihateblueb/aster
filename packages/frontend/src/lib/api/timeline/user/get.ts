import localstore from '$lib/utils/localstore';

export default async function timelineUserGet(user: string) {
	let timelineRes = {};

	let timelineReq = await fetch(`/api/v2/user/${user}/timeline`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${localstore.get('a_token')}`
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
