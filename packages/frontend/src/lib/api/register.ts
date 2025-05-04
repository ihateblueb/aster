import https from '$lib/https';

export default async function tryRegister(
	username: string,
	password: string,
	invite?: string
) {
	return await https.post('/api/auth/register', {
		username: username,
		password: password,
		invite: invite
	});
}
