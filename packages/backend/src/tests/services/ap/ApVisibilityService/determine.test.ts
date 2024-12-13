import { expect, test } from 'vitest';

import ApVisibilityService from '../../../../services/ap/ApVisibilityService.js';
import UserService from '../../../../services/UserService.js';
import db from '../../../../utils/database.js';

await db.initialize();

const instanceactor = await UserService.get({ username: 'instanceactor' });

const apvis1 = await ApVisibilityService.determine({});
const apvis2 = await ApVisibilityService.determine({
	actor: instanceactor.apId
});
const apvis3 = await ApVisibilityService.determine({
	actor: instanceactor.apId,
	to: [instanceactor.followersUrl],
	cc: []
});
const apvis4 = await ApVisibilityService.determine({
	actor: instanceactor.apId,
	to: [instanceactor.followersUrl],
	cc: ['https://www.w3.org/ns/activitystreams#Public']
});
const apvis5 = await ApVisibilityService.determine({
	actor: instanceactor.apId,
	to: ['https://www.w3.org/ns/activitystreams#Public'],
	cc: []
});
const apvis6 = await ApVisibilityService.determine({
	actor: instanceactor.apId,
	to: ['https://www.w3.org/ns/activitystreams#Public'],
	cc: [instanceactor.followersUrl]
});
const apvis7 = await ApVisibilityService.determine({
	actor: instanceactor.apId,
	to: ['https://www.w3.org/ns/activitystreams#Public'],
	cc: ['https://www.w3.org/ns/activitystreams#Public']
});
const apvis8 = await ApVisibilityService.determine({
	actor: instanceactor.apId,
	to: ['https://www.w3.org/ns/activitystreams#Public', instanceactor.apId],
	cc: []
});
const apvis9 = await ApVisibilityService.determine({
	actor: instanceactor.apId,
	to: ['https://www.w3.org/ns/activitystreams#Public'],
	cc: [instanceactor.followersUrl, instanceactor.apId]
});
const apvis10 = await ApVisibilityService.determine({
	actor: instanceactor.apId,
	to: [
		'https://www.w3.org/ns/activitystreams#Public',
		instanceactor.followersUrl
	],
	cc: [
		instanceactor.followersUrl,
		instanceactor.followersUrl,
		instanceactor.apId
	]
});

test('no actor returns direct', () => {
	expect(apvis1).toStrictEqual({
		visibility: 'direct',
		to: undefined
	});
});

test('actor but no to/cc returns direct', () => {
	expect(apvis2).toStrictEqual({
		visibility: 'direct',
		to: undefined
	});
});

test('to (followers) cc (nobody) returns followers', () => {
	expect(apvis3).toStrictEqual({
		visibility: 'followers',
		to: undefined
	});
});

test('to (followers) cc (public) returns unlisted', () => {
	expect(apvis4).toStrictEqual({
		visibility: 'unlisted',
		to: undefined
	});
});

test('to (public) cc (nobody) returns public', () => {
	expect(apvis5).toStrictEqual({
		visibility: 'public',
		to: undefined
	});
});

test('to (public) cc (followers) returns public', () => {
	expect(apvis6).toStrictEqual({
		visibility: 'public',
		to: undefined
	});
});

test('to (public) cc (public) returns public', () => {
	expect(apvis7).toStrictEqual({
		visibility: 'public',
		to: undefined
	});
});

test('to (public, actor) cc (nobody) returns public and to actor', () => {
	expect(apvis8).toStrictEqual({
		visibility: 'public',
		to: [instanceactor.id]
	});
});

test('to (public) cc (followers, actor) returns public and to actor', () => {
	expect(apvis9).toStrictEqual({
		visibility: 'public',
		to: [instanceactor.id]
	});
});

test('to (public, followers) cc (followers, followers, actor) returns public and to actor', () => {
	expect(apvis10).toStrictEqual({
		visibility: 'public',
		to: [instanceactor.id]
	});
});

await db.destroy();
