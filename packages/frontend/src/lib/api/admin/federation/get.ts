import localstore from '$lib/utils/localstore';

export default async function adminFederationGet() {
	let res = {};

	let req = await fetch(`/api/v2/admin/federation`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${localstore.get('a_token')}`
		}
	});

	res = await req.json();

	if (req.status === 200) {
		console.log(res);
	} else {
		console.log(res);
	}

	return res;
}
