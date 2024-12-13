import test from 'ava';
import { registerCompletionHandler } from 'ava';

import IdService from '../../services/IdService.js';

const id = IdService.generate();
const aid = IdService.generateAid();
const aidx = IdService.generateAidx();
const meid = IdService.generateMeid();
const meidg = IdService.generateMeidg();
const objectid = IdService.generateObjectId();
const ulid = IdService.generateUlid();
const uuidv4 = IdService.generateUuidv4();
const uuidv7 = IdService.generateUuidv7();

test('generate returns value', (t) => {
	t.is(id !== undefined, true);
});

test('generate aid returns value', (t) => {
	t.is(aid !== undefined, true);
});

test('generate aidx returns value', (t) => {
	t.is(aidx !== undefined, true);
});

test('generate meid returns value', (t) => {
	t.is(meid !== undefined, true);
});

test('generate meidg returns value', (t) => {
	t.is(meidg !== undefined, true);
});

test('generate objectid returns value', (t) => {
	t.is(objectid !== undefined, true);
});

test('generate ulid returns value', (t) => {
	t.is(ulid !== undefined, true);
});

test('generate uuidv4 returns value', (t) => {
	t.is(uuidv4 !== undefined, true);
});

test('generate uuidv7 returns value', (t) => {
	t.is(uuidv7 !== undefined, true);
});

registerCompletionHandler(() => {
	process.exit();
});
