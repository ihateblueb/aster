import { http } from '../http';

export default async function timelineGet(timeline: string, since?: string) {
	return new http().get(
		`/api/v2/timeline/${timeline}${since ? '/?since=' + since : ''}`
	);
}
