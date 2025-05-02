import localstore from '$lib/localstore';

let loggedIn = $state(false);
if (localstore.getParsed('token')) loggedIn = true;

let wsUrl = '/api/streaming?token=' + localstore.getParsed('token');
let ws: undefined | WebSocket = undefined;

function connect() {
	ws = new WebSocket(wsUrl);

	ws.addEventListener('error', (e) => {
		console.log('[ws] connection errored');
		ws?.close();
	});

	ws.addEventListener('close', (e) => {
		console.log('[ws] closed connection');

		setTimeout(() => {
			console.log('[ws] attempting reconnect...');
			connect();
		}, 5000);
	});
}

// todo: seperate event system layer before that communicates with this here

if (loggedIn) {
	connect();
}

export default ws;
