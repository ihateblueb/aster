import localstore from '$lib/utils/localstore';

export default async function notificationsGet(
	timeline: string,
	since?: string
) {
	let timelineRes = {};

	let timelineReq = await fetch(
		`/api/v2/notifications/${timeline}${since ? '/?since=' + since : ''}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${localstore.get('a_token')}`
			}
		}
	);

	timelineRes = await timelineReq.json();

	if (timelineReq.status === 200) {
		console.log(timelineRes);
	} else {
		console.log(timelineRes);
	}

	return timelineRes;
}
