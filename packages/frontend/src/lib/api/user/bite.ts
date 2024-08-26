import localstore from '$lib/utils/localstore';

export default async function userBite(userId: string) {
	let userRes = {};

	let userReq = await fetch(`/api/v2/user/${userId}/bite`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${localstore.get('a_token')}`
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
