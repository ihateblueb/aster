import { http } from '$lib/api/http';

export default async function driveFileEdit(id: string, body: object) {
	return new http().patch(`/api/v2/drive/file/${id}`, body);
}
