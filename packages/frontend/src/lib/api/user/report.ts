import Store from '$lib/scripts/Store';

export default async function userReport(
	userId: string,
	reportContent: string
) {
	let userRes = {};

	var userReq = await fetch(`/api/v1/user/${userId}/report`, {
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

	userRes = await userReq.json();

	if (userReq.status === 200) {
		console.log(userRes);
	} else {
		console.log(userRes);
	}

	return userRes;
}
