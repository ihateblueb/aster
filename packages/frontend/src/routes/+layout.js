export const ssr = false;

export async function load() {
	const response = await fetch(`/api/v1/meta`);
	const data = await response.json();
	return data;
}
