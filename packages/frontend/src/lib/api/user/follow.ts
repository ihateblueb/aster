import Store from '$lib/scripts/Store';

export default async function userFollow(userId: String) {
	let userRes = {};

	var userReq = await fetch(`/api/v1/user/${userId}/follow`, {
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
