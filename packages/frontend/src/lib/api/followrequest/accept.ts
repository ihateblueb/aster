import localstore from '$lib/utils/localstore';
import { http } from '../http';

export default async function followrequestAccept(id) {
	return new http().post(`/api/v2/followrequest/accept`, {
		id: id
	});
}
