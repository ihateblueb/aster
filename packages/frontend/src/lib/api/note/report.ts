import localstore from '$lib/utils/localstore';
import { http } from '../http';

export default async function noteReport(
	noteId: string,
	reportContent: string
) {
	return new http().post(`/api/v2/note/${noteId}/report`, {
		content: reportContent
	});
}
