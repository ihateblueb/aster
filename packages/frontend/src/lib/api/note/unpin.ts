import { http } from '../http';

export default async function noteUnpin(noteId: string) {
	return new http().post(`/api/v2/note/${noteId}/unpin`);
}
