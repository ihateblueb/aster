import { http } from '../http';

export default async function searchGet(query: string) {
	return new http().get(`/api/v2/search?q=${query}`);
}
