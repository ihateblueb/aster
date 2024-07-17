export async function load() {
	const response = await fetch(`/api/v2/meta`);
	const data = await response.json();
	return data;
}
