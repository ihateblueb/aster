import { http } from '../http';

export default async function updateAccount(id: object) {
	return new http().post(`/api/v2/user/${id}/update`);
}
