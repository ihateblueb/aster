export async function load({ params }) {
	const response = await fetch(`/api/v1/note/${params.noteid}`);
	const data = await response.json();
	return data;
}
