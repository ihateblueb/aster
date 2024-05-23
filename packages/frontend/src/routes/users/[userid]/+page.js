import { PUBLIC_APIURL } from '$env/static/public';

export async function load({ params }) {
	const response = await fetch(
		`${PUBLIC_APIURL}/api/v1/users/${params.userid}`
	);
	const data = await response.json();
	return data;
}
