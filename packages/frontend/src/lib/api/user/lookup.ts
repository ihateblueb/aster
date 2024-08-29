import { http } from '../http';

export default async function userLookup(username: string) {
	return new http().get(`/api/v2/lookup/@${username}`);
}
