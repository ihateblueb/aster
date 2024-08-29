import localstore from '$lib/utils/localstore';
import { http } from '../http';

export default async function followrequestDeny(id) {
	return new http().post(`/api/v2/followrequest/deny`, {
		id: id
	});
}
