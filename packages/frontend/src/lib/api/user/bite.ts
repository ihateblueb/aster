import Store from '$lib/utils/Store';

export default async function userBite(userId: string) {
	let userRes = {};

	var userReq = await fetch(`/api/v1/user/${userId}/bite`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${Store.get('a_token')}`
		}
	});

	userRes = await userReq.json();

	if (userReq.status === 200) {
		console.log(userRes);
	} else {
		console.log(userRes);
	}

	return userRes;
}
