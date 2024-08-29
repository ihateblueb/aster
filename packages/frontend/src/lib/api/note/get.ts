import { http } from '../http';

export default async function noteGet(noteId: string) {
	return new http().get(`/api/v2/note/${noteId}`);
}
