export async function load({ params }) {
	const response = await fetch(`/api/v2/note/${params.noteid}/raw`);
	const data = await response.json();
	return data;
}
