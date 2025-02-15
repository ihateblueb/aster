import { EventEmitter } from 'node:events';

const userEmitter = new EventEmitter();
const globalEmitter = new EventEmitter();

class WebsocketService {
	public userEmitter: EventEmitter = userEmitter;
	public globalEmitter: EventEmitter = globalEmitter;
}

export default new WebsocketService();
