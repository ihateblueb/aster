export async function load({ params }) {
	const lookedUpUser = await fetch(`/api/v1/lookup/@${params.userid}`);
	const lookedUpUserData = await lookedUpUser.json();
	const response = await fetch(`/api/v1/user/${lookedUpUserData.id}`);
	const data = await response.json();
	return data;
}
