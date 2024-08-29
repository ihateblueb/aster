import { http } from '../http';

export default async function adGetRandom() {
	return new http().get(`/api/v2/ad/random`);
}
