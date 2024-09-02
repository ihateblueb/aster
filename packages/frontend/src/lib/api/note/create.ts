import { http } from '../http';

export default async function noteCreate(
	noteCw: string,
	noteContent: string,
	visibility: string
) {
	return new http().post(`/api/v2/note`, {
		cw: noteCw,
		content: noteContent,
		visibility: visibility
	});
}
