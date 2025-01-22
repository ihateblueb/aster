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

type where = object;

type GenericId = string;

type AsLink = string;
// equivalent to typeorm's ObjectLiteral
type AsObject = {
	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	[key: string]: any;
};

type ApObject = AsObject;
type ApId = AsLink;
type Inbox = AsLink;

type Visibility = 'public' | 'unlisted' | 'followers' | 'direct';
type RelationshipType = 'follow' | 'block' | 'mute';
type NotificationType =
	| 'like'
	| 'repeat'
	| 'mention'
	| 'follow'
	| 'acceptedFollow'
	| 'brokenFollow'
	| 'report'
	| 'bite';
