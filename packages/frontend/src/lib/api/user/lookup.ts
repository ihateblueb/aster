export default async function userLookup(username: string) {
	const response = await fetch(`/api/v1/lookup/@${username}`);
	const data = await response.json();
	return data;
}
