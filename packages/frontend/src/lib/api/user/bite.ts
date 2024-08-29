import { http } from '../http';

export default async function userBite(userId: string) {
	return new http().post(`/api/v2/user/${userId}/bite`);
}
