import { http } from '../http';

export default async function noteLike(noteId: string) {
	return new http().post(`/api/v2/note/${noteId}/like`);
}
