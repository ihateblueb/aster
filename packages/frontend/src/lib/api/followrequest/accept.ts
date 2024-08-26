import localstore from '$lib/utils/localstore';

export default async function followrequestAccept(id) {
	let followrequestsRes = {};

	let followrequestsReq = await fetch(`/api/v2/followrequest/accept`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${localstore.get('a_token')}`
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
