import WebSocket, { WebSocketServer } from 'ws';
import config from '../../../utils/config';

const wss = new WebSocketServer({
	port: config.port
});

wss.on('connection', (ws: WebSocket) => {
	console.log('New client connected');

	ws.on('message', (message: string) => {
		console.log(`Received message: ${message}`);
		ws.send(`Server received your message: ${message}`);
	});

	ws.on('close', () => {
		console.log('Client disconnected');
	});
});
