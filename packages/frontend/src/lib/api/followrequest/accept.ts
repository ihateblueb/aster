import Store from '$lib/utils/Store';

export default async function followrequestAccept(id) {
	let followrequestsRes = {};

	var followrequestsReq = await fetch(`/api/v2/followrequest/accept`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${Store.get('a_token')}`
		},
		body: JSON.stringify({
			id: id
		})
	});

	followrequestsRes = await followrequestsReq.json();

	if (followrequestsReq.status === 200) {
		console.log(followrequestsRes);
	} else {
		console.log(followrequestsRes);
	}

	return followrequestsRes;
}
