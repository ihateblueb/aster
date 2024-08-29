import { http } from '../http';

export default async function editAccount(body: object) {
	return new http().patch(`/api/v2/user`, body);
}
