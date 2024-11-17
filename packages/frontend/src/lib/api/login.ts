import https from '$lib/https';

export default async function tryLogin(username: string, password: string) {
	return await https.post('/api/auth/login', { username, password });
}
