import { http } from '../http';

export default async function adGet(adId: string) {
	return new http().get(`/api/v2/ad/${adId}`);
}
