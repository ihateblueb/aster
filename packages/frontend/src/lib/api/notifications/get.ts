import localstore from '$lib/utils/localstore';
import { http } from '../http';

export default async function notificationsGet(
	timeline: string,
	since?: string
) {
	return new http().get(
		`/api/v2/notifications/${timeline}${since ? '/?since=' + since : ''}`
	);
}
