import { http } from '../http';

export default async function noteReact(noteId: string, reaction: string) {
	return new http().post(`/api/v2/note/${noteId}/react`, {
		reaction: reaction
	});
}
