import localstore from '$lib/utils/localstore';

export default async function followrequestGet() {
	let followrequestsRes = {};

	let followrequestsReq = await fetch(`/api/v2/followrequests`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${localstore.get('a_token')}`
		}
	});

	followrequestsRes = await followrequestsReq.json();

	if (followrequestsReq.status === 200) {
		console.log(followrequestsRes);
	} else {
		console.log(followrequestsRes);
	}

	return followrequestsRes;
}
