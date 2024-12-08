import { EventEmitter } from 'node:events';

import { WebSocketServer } from 'ws';

import logger from '../utils/logger.js';
import AuthService from './AuthService.js';
import UserService from './UserService.js';

const userEmitter = new EventEmitter();
const globalEmitter = new EventEmitter();

const wss = new WebSocketServer({ noServer: true });

wss.on('connection', async (ws, request, auth) => {
	const user = await UserService.get({ id: auth.user });

	logger.debug('ws', 'user ' + user.username + ' connected');

	ws.send(
		JSON.stringify({
			type: 'greet',
			user: user.id
		})
	);

	userEmitter.on(auth.user, (data) => {
		ws.send(JSON.stringify(data));
	});

	let currentTimeline = '';

	globalEmitter.on('timeline:local', (data) => {
		if (currentTimeline === 'local') {
			ws.send(JSON.stringify(data));
		}
	});
	globalEmitter.on('timeline:bubble', (data) => {
		if (currentTimeline === 'bubble') {
			ws.send(JSON.stringify(data));
		}
	});
	globalEmitter.on('timeline:global', (data) => {
		if (currentTimeline === 'global') {
			ws.send(JSON.stringify(data));
		}
	});

	ws.on('message', (data) => {
		logger.debug('ws', user.username + ': ' + data.toString());

		if (data.toString() === 'sub timeline:local') {
			currentTimeline = 'local';
		} else if (data.toString() === 'sub timeline:bubble') {
			currentTimeline = 'bubble';
		} else if (data.toString() === 'sub timeline:global') {
			currentTimeline = 'global';
		}

		ws.send(JSON.stringify({ type: 'echo', data: data.toString() }));
	});
});

class WebsocketService {
	public userEmitter: EventEmitter = userEmitter;
	public globalEmitter: EventEmitter = globalEmitter;

	public async server(request, socket, head) {
		const { pathname } = new URL(request.url, 'wss://base.url');

		const auth = await AuthService.verify(request.headers.authorization);

		if (auth.error) {
			socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
			socket.destroy();
		}

		if (pathname === '/api/streaming') {
			wss.handleUpgrade(request, socket, head, (ws) => {
				wss.emit('connection', ws, request, auth);
			});
		} else {
			socket.destroy();
		}
	}
}

export default new WebsocketService();
