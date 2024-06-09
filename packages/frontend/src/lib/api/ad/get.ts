export default async function adGet(adId: string) {
	const response = await fetch(`/api/v1/ad/${adId}`);
	const data = await response.json();
	return data;
}
