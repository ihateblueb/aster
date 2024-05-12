export const ssr = false;

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const response = await fetch(
		`https://as2.blueb.me/api/v1/notes/${params.noteid}`
	);
	const data = await response.json();
	return data;
}
