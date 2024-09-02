import { http } from '../http';

export default async function notePin(noteId: string) {
	return new http().post(`/api/v2/note/${noteId}/pin`);
}
