import localstore from '$lib/utils/localstore';

export default async function userReport(
	userId: string,
	reportContent: string
) {
	let userRes = {};

	let userReq = await fetch(`/api/v2/user/${userId}/report`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${localstore.get('a_token')}`
		},
		body: JSON.stringify({
			content: reportContent
		})
	});

	userRes = await userReq.json();

	if (userReq.status === 200) {
		console.log(userRes);
	} else {
		console.log(userRes);
	}

	return userRes;
}
