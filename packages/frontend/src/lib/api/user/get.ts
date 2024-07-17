export default async function userGet(userId: string) {
	const response = await fetch(`/api/v2/user/${userId}`);
	const data = await response.json();
	return data;
}
