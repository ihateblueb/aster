import localstore from '$lib/utils/localstore';
import { http } from '../http';

export default async function driveGet() {
	return new http().get(`/api/v2/drive`);
}
