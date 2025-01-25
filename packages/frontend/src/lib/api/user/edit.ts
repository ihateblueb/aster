import https from '$lib/https';

export default function editUser(body: any, id?: string) {
	return https.patch(`/api/user/${id}`, body);
}
