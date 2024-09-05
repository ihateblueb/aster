import { http } from '../http';

export default async function userGet(userId: string) {
	return new http().get(`/api/v2/user/${userId}`);
}
