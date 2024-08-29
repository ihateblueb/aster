import { http } from '../http';

export default async function queueGet() {
	return new http().get(`/admin/queue/dashboard/api/queues`);
}
