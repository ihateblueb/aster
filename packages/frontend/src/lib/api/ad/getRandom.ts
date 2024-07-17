export default async function adGetRandom() {
	const response = await fetch(`/api/v2/ad/random`);
	const data = await response.json();
	return data;
}
