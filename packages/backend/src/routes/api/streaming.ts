import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import AuthService from '../../services/AuthService.js';
import WebsocketService from '../../services/WebsocketService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Streaming'],
		querystring: {
			type: 'object',
			properties: {
				token: { type: ['string', 'null'] }
			}
		}
	} as const;

	fastify.get<{
		Querystring: FromSchema<typeof schema.querystring>;
	}>(
		'/api/streaming',
		{
			schema: schema,
			websocket: true
		},
		async (socket, req) => {
			const auth = await AuthService.verify(req.query.token);

			if (auth.error) socket.close();

			socket.on('open', () => {
				socket.send(
					JSON.stringify({
						type: 'greet',
						user: auth.error ? undefined : auth.user.id
					})
				);
			});

			let subscriptions = [];

			socket.on('message', (msg) => {
				const content = msg.toString();

				if (content.startsWith('sub '))
					if (!subscriptions.includes(content.replace('sub ', '')))
						subscriptions.push(content.replace('sub ', ''));

				if (content.startsWith('unsub '))
					subscriptions = subscriptions.filter(
						(e) => e !== content.replace('unsub ', '')
					);

				socket.send(JSON.stringify({ type: 'echo', data: content }));
			});

			WebsocketService.userEmitter.on(auth.user.id, (e) => {
				socket.send(JSON.stringify(e));
			});

			WebsocketService.globalEmitter.on('timeline:local', (e) => {
				if (subscriptions.includes('timeline:local'))
					socket.send(JSON.stringify(e));
			});

			WebsocketService.globalEmitter.on('timeline:bubble', (e) => {
				if (subscriptions.includes('timeline:bubble'))
					socket.send(JSON.stringify(e));
			});

			WebsocketService.globalEmitter.on('timeline:public', (e) => {
				if (subscriptions.includes('timeline:public'))
					socket.send(JSON.stringify(e));
			});

			socket.on('close', () => {});
		}
	);
});
