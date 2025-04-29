import redis from 'redis';

import connection from '../utils/redis.js';
import ConfigService from './ConfigService.js';

const publisher = await redis
	.createClient({
		socket: {
			host: connection.host,
			port: connection.port
		},
		database: ConfigService.redis.database,
		name: ConfigService.redis.user,
		password: ConfigService.redis.pass
	})
	.on('error', (err) => {
		console.log(err);
	})
	.connect();

const subscriber = await redis
	.createClient({
		socket: {
			host: connection.host,
			port: connection.port
		},
		database: ConfigService.redis.database,
		name: ConfigService.redis.user,
		password: ConfigService.redis.pass
	})
	.on('error', (err) => {
		console.log(err);
	})
	.connect();

type WebsocketStream =
	| string
	| 'timeline:local'
	| 'timeline:bubble'
	| 'timeline:public';

class WebsocketService {
	public keyPrefix: string = ConfigService.redis.prefix
		? ConfigService.redis.prefix + ':ws:'
		: 'ws:';

	public publisher = publisher;
	public subscriber = subscriber;

	public async publish(stream: WebsocketStream, message: object) {
		return await this.publisher.publish(
			this.keyPrefix + stream,
			JSON.stringify(message)
		);
	}

	public async subscribe(stream: WebsocketStream, listener: any) {
		return await this.subscriber.subscribe(
			this.keyPrefix + stream,
			listener
		);
	}
}

export default new WebsocketService();
