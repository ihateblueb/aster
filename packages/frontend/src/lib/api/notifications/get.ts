import Store from '$lib/utils/Store';

export default async function notificationsGet() {
	let notificationsRes = {};

	var notificationsReq = await fetch(`/api/v2/notifications`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${Store.get('a_token')}`
		}
	});

	notificationsRes = await notificationsReq.json();

	if (notificationsReq.status === 200) {
		console.log(notificationsRes);
	} else {
		console.log(notificationsRes);
	}

	return notificationsRes;
}
