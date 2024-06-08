export default async function noteGet(noteId: string) {
	const response = await fetch(`/api/v1/note/${noteId}`);
	const data = await response.json();
	return data;
}
