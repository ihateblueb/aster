/*
/api/v2/search?q=
*/
import Store from '$lib/utils/Store';

export default async function searchGet(query: string) {
	let searchRes = {};

	let searchReq = await fetch(`/api/v2/search?q=${query}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${Store.get('a_token')}`
		}
	});

	searchRes = await searchReq.json();

	if (searchReq.status === 200) {
		console.log(searchRes);
	} else {
		console.log(searchRes);
	}

	return searchRes;
}
