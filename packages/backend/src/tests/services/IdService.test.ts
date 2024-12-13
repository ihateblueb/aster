import { expect, test } from 'vitest';

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

test('generate returns value', () => {
	expect(id !== undefined);
});

test('generate aid returns value', () => {
	expect(aid !== undefined);
});

test('generate aidx returns value', () => {
	expect(aidx !== undefined);
});

test('generate meid returns value', () => {
	expect(meid !== undefined);
});

test('generate meidg returns value', () => {
	expect(meidg !== undefined);
});

test('generate objectid returns value', () => {
	expect(objectid !== undefined);
});

test('generate ulid returns value', () => {
	expect(ulid !== undefined);
});

test('generate uuidv4 returns value', () => {
	expect(uuidv4 !== undefined);
});

test('generate uuidv7 returns value', () => {
	expect(uuidv7 !== undefined);
});
