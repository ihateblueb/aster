import userLookup from '$lib/api/user/lookup';

export async function load({ params }) {
	const lookup = await userLookup(params.userid);
	const response = await fetch(`/api/v2/user/${lookup.id}/raw`);
	const data = await response.json();
	return data;
}
