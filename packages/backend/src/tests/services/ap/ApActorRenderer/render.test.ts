import test from 'ava';
import { registerCompletionHandler } from 'ava';

import ApActorRenderer from '../../../../services/ap/ApActorRenderer.js';
import UserService from '../../../../services/UserService.js';
import db from '../../../../utils/database.js';

await db.initialize();

const instanceactor = await UserService.get({ username: 'instanceactor' });
const actor = ApActorRenderer.render(instanceactor);
const keys = Object.keys(actor);

test('actor has @context', (t) => {
	t.is(keys.includes('@context'), true);
});

test('actor has valid type', (t) => {
	t.is(['Service', 'Person'].includes(actor.type), true);
});

test('actor has id', (t) => {
	t.is(actor.id !== undefined, true);
});

test('actor has preferredUsername', (t) => {
	t.is(actor.preferredUsername !== undefined, true);
});

test('actor has inbox', (t) => {
	t.is(actor.inbox !== undefined, true);
});

test('actor has outbox', (t) => {
	t.is(actor.outbox !== undefined, true);
});

test('actor has sharedInbox', (t) => {
	t.is(actor.sharedInbox !== undefined, true);
});

test('actor has endpoints.sharedInbox', (t) => {
	t.is(actor.endpoints.sharedInbox !== undefined, true);
});

test('actor sharedInbox and endpoints.sharedInbox are the same', (t) => {
	t.is(actor.sharedInbox === actor.endpoints.sharedInbox, true);
});

test('actor has followers url', (t) => {
	t.is(actor.followers !== undefined, true);
});

test('actor has following url', (t) => {
	t.is(actor.following !== undefined, true);
});

test('actor has publicKey', (t) => {
	t.is(actor.publicKey !== undefined, true);
});

test("actor's publicKey has id", (t) => {
	t.is(actor.publicKey.id !== undefined, true);
});

test("actor's publicKey has valid type", (t) => {
	t.is(actor.publicKey.type === 'Key', true);
});

test("actor's publicKey's owner is actor's id", (t) => {
	t.is(actor.publicKey.owner === actor.id, true);
});

test("actor's publicKey has publicKeyPem", (t) => {
	t.is(actor.publicKey.publicKeyPem !== undefined, true);
});

await db.destroy();

registerCompletionHandler(() => {
	process.exit();
});
