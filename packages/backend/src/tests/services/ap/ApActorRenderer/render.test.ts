import { expect, test } from 'vitest';

import ApActorRenderer from '../../../../renderers/ap/ApActorRenderer.js';
import UserService from '../../../../services/UserService.js';
import db from '../../../../utils/database.js';

await db.initialize();

const instanceactor = await UserService.get({ username: 'instanceactor' });
const actor = ApActorRenderer.render(instanceactor);
const keys = Object.keys(actor);

test('actor has @context', () => {
	expect(keys.includes('@context'));
});

test('actor has valid type', () => {
	expect(['Service', 'Person'].includes(actor.type));
});

test('actor has id', () => {
	expect(actor.id !== undefined);
});

test('actor has preferredUsername', () => {
	expect(actor.preferredUsername !== undefined);
});

test('actor has inbox', () => {
	expect(actor.inbox !== undefined);
});

test('actor has outbox', () => {
	expect(actor.outbox !== undefined);
});

test('actor has sharedInbox', () => {
	expect(actor.sharedInbox !== undefined);
});

test('actor has endpoints.sharedInbox', () => {
	expect(actor.endpoints.sharedInbox !== undefined);
});

test('actor sharedInbox and endpoints.sharedInbox are the same', () => {
	expect(actor.sharedInbox === actor.endpoints.sharedInbox);
});

test('actor has followers url', () => {
	expect(actor.followers !== undefined);
});

test('actor has following url', () => {
	expect(actor.following !== undefined);
});

test('actor has publicKey', () => {
	expect(actor.publicKey !== undefined);
});

test("actor's publicKey has id", () => {
	expect(actor.publicKey.id !== undefined);
});

test("actor's publicKey has valid type", () => {
	expect(actor.publicKey.type === 'Key');
});

test("actor's publicKey's owner is actor's id", () => {
	expect(actor.publicKey.owner === actor.id);
});

test("actor's publicKey has publicKeyPem", () => {
	expect(actor.publicKey.publicKeyPem !== undefined);
});

await db.destroy();
