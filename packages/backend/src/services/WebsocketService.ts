import { EventEmitter } from 'node:events';

import { IncomingMessage } from 'http';
import { Duplex } from 'stream';
import { WebSocketServer } from 'ws';

import logger from '../utils/logger.js';
import AuthService from './AuthService.js';
import UserService from './UserService.js';

const userEmitter = new EventEmitter();
const globalEmitter = new EventEmitter();

const wss = new WebSocketServer({ noServer: true });

wss.on('connection', async (ws, request, auth) => {
	const user = await UserService.get({ id: auth.user.id });

	logger.debug('ws', 'user ' + user.username + ' connected');

	ws.send(
		JSON.stringify({
			type: 'greet',
			user: user.id
		})
	);

	userEmitter.on(auth.user.id, (data) => {
		ws.send(JSON.stringify(data));
	});

	let subscriptions = [];

	globalEmitter.on('timeline:local', (data) => {
		if (subscriptions.includes('timeline:local')) {
			ws.send(JSON.stringify(data));
		}
	});
	globalEmitter.on('timeline:bubble', (data) => {
		if (subscriptions.includes('timeline:bubble')) {
			ws.send(JSON.stringify(data));
		}
	});
	globalEmitter.on('timeline:global', (data) => {
		if (subscriptions.includes('timeline:global')) {
			ws.send(JSON.stringify(data));
		}
	});

	ws.on('message', (data) => {
		logger.debug('ws', user.username + ': ' + data.toString());

		if (data.toString().startsWith('sub ')) {
			if (!subscriptions.includes(data.toString().replace('sub ', '')))
				subscriptions.push(data.toString().replace('sub ', ''));
		} else if (data.toString().startsWith('unsub ')) {
			subscriptions = subscriptions.filter(
				(e) => e !== data.toString().replace('unsub ', '')
			);
		}

		ws.send(JSON.stringify({ type: 'echo', data: data.toString() }));
	});
});

class WebsocketService {
	public userEmitter: EventEmitter = userEmitter;
	public globalEmitter: EventEmitter = globalEmitter;

	public async server(
		request: IncomingMessage,
		socket: Duplex,
		head: Buffer<ArrayBufferLike>
	) {
		const url = new URL(request.url, 'wss://base.url');

		const auth = await AuthService.verify(url.searchParams.get('token'));

		if (auth.error) {
			socket.write(`HTTP/1.1 ${auth.status}\r\n\r\n`);
			socket.destroy();
		}

		if (url.pathname === '/api/streaming') {
			wss.handleUpgrade(request, socket, head, (ws) => {
				wss.emit('connection', ws, request, auth);
			});
		} else {
			socket.destroy();
		}
	}
}

export default new WebsocketService();
