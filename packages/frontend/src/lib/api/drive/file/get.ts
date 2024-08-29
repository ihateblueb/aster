import { http } from '$lib/api/http';
import localstore from '$lib/utils/localstore';

export default async function driveFileGet(id: string) {
	return new http().get(`/api/v2/drive/file/${id}`);
}
