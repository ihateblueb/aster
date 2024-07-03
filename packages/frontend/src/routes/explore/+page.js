export async function load() {
	const response = await fetch(`/api/v1/timeline/public`);
	const data = await response.json();
	return data;
}
