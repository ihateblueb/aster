export const ssr = false;

import { PUBLIC_APIURL } from '$env/static/public';

export async function load({ params }) {
	const response = await fetch(
		`${PUBLIC_APIURL}/api/v1/notes/${params.noteid}`
	);
	const data = await response.json();
	return data;
}
