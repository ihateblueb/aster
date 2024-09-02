import { http } from '../http';

export default async function noteDelete(noteId: string) {
	return new http().delete(`/api/v2/note`, {
		id: noteId
	});
}
