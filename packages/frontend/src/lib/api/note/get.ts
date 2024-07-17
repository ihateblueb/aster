export default async function noteGet(noteId: string) {
	const response = await fetch(`/api/v2/note/${noteId}`);
	const data = await response.json();
	return data;
}
