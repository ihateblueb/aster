import { http } from '$lib/api/http';
import localstore from '$lib/utils/localstore';

export default async function driveFileAdd(file: File) {
	return new http().post(`/api/v2/drive/file/${file.name}`, file);
}
