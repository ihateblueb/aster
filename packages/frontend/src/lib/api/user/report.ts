import { http } from '../http';

export default async function userReport(
	userId: string,
	reportContent: string
) {
	return new http().post(`/api/v2/user/${userId}/report`, {
		content: reportContent
	});
}
