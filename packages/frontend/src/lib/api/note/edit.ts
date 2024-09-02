import { http } from '../http';

export default async function noteEdit(
	noteId: string,
	noteCw?: string,
	noteContent?: string
) {
	return new http().patch(`/api/v2/note/${noteId}`, {
		cw: noteCw,
		content: noteContent
	});
}
