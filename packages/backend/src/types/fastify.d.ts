import { ObjectLiteral } from 'typeorm';

declare module 'fastify' {
	export interface FastifyInstance {
		requireAuth;
		optionalAuth;
	}

	export interface FastifyRequest {
		auth?: {
			error: boolean;
			status: number;
			message: string;
			user?: ObjectLiteral;
		};
	}
}
