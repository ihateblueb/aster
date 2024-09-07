import adminInstanceGet from '$lib/api/admin/instance/get';

export async function load({ params }) {
	const data = await adminInstanceGet(params.host);
	return data;
}
