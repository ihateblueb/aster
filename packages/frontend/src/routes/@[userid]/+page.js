import userLookup from '$lib/api/user/lookup';

export async function load({ params }) {
	const data = await userLookup(params.userid);
	return data;
}
