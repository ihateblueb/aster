import localstore from '$lib/localstore';

let loggedIn = $state(false);
if (localstore.get('token')) loggedIn = true;

let wsUrl = '/api/streaming?token=' + localstore.get('token');
let ws: undefined | WebSocket = undefined;

if (loggedIn) {
	ws = new WebSocket(wsUrl);

	ws.addEventListener('open', (e) => {
		console.log('[ws] opened connection');
	});

	ws.addEventListener('close', (e) => {
		console.log('[ws] closed connection');

		setTimeout(() => {
			console.log('[ws] attempting reconnect...');
			ws = new WebSocket(wsUrl);
		}, 1000);
	});

	ws.addEventListener('error', (e) => {
		console.log('[ws] connection errored');
	});
}

export default ws;
