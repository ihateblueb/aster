import { http } from '$lib/api/http';

export default async function driveFileAdd(file: File) {
	return new http().post(`/api/v2/drive/file/${file.name}`, file);
}
