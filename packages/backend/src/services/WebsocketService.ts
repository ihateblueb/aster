import { EventEmitter } from 'node:events';

import { IncomingMessage } from 'http';
import { Duplex } from 'stream';
import { WebSocketServer } from 'ws';

import logger from '../utils/logger.js';
import AuthService from './AuthService.js';
import UserService from './UserService.js';

const userEmitter = new EventEmitter();
const globalEmitter = new EventEmitter();

class WebsocketService {
	public userEmitter: EventEmitter = userEmitter;
	public globalEmitter: EventEmitter = globalEmitter;
}

export default new WebsocketService();
