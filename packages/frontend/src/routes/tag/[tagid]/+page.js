import timelineGet from '$lib/api/timeline/get';

export async function load({ params }) {
	const data = await timelineGet('tag', params.tagid);
	return data;
}
