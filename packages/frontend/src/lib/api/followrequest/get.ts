import { http } from '../http';

export default async function followrequestGet() {
	return new http().get(`/api/v2/followrequests`);
}
