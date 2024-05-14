export const ssr = false;

export async function load({ params }) {
	const response = await fetch(
		`https://as2.blueb.me/api/v1/users/${params.userid}`
	);
	const data = await response.json();
	return data;
}
