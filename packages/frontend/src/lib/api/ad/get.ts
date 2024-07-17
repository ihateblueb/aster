export default async function adGet(adId: string) {
	const response = await fetch(`/api/v2/ad/${adId}`);
	const data = await response.json();
	return data;
}
