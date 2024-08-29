import { http } from '$lib/api/http';
import localstore from '$lib/utils/localstore';

export default async function driveFileEdit(id: string, body: object) {
	return new http().patch(`/api/v2/drive/file/${id}`, body);
}
