import localstore from '$lib/utils/localstore';
import { http } from '../http';

export default async function noteBookmark(noteId: string) {
	return new http().post(`/api/v2/note/${noteId}/bookmark`);
}
