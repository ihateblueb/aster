import localstore from '$lib/utils/localstore';
import { http } from '../http';

export default async function userFollow(userId: string) {
	return new http().post(`/api/v2/user/${userId}/follow`);
}
