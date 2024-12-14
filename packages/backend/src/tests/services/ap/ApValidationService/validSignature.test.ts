import crypto from 'crypto';
import express from 'express';
import { expect, test } from 'vitest';

import ApValidationService from '../../../../services/ap/ApValidationService.js';
import config from '../../../../utils/config.js';
import db from '../../../../utils/database.js';

await db.initialize();

const url = new URL(config.url);

// eslint-disable-next-line prefer-const
let req = express().request;
req.url = new URL(url).href + 'inbox';

test('request without host is not valid', async () => {
	expect(await ApValidationService.validSignature(req)).toStrictEqual({
		valid: false
	});
});

test('request with invalid host is not valid', async () => {
	req.headers.host = 'improper host';
	expect(await ApValidationService.validSignature(req)).toStrictEqual({
		valid: false
	});
});

test('request without digest is not valid', async () => {
	req.headers.host = new URL(config.url).host;
	expect(await ApValidationService.validSignature(req)).toStrictEqual({
		valid: false
	});
});

test('request without digest starting with SHA-256= is not valid', async () => {
	req.headers['digest'] = 'improper digest';
	expect(await ApValidationService.validSignature(req)).toStrictEqual({
		valid: false
	});
});

test('request with invalid digest is not valid', async () => {
	req.headers['digest'] = 'SHA-256=improper digest';
	expect(await ApValidationService.validSignature(req)).toStrictEqual({
		valid: false
	});
});

test('request without signature is not valid', async () => {
	const digest = crypto
		.createHash('sha256')
		.update(JSON.stringify({}))
		.digest('base64');

	req.headers['digest'] = 'SHA-256=' + digest;
	expect(await ApValidationService.validSignature(req)).toStrictEqual({
		valid: false
	});
});

test.todo('request with unparsable signature');
test.todo('request with signature without keyId is not valid');
test.todo('request without resolvable actor in keyId is not valid');
test.todo('post request from no accept instance is blocked');
test.todo('get request from no return instance is blocked');
test.todo(
	'request with Delete activity from not found actor is not valid, but will pretend to be processed'
);
test.todo('request from not found actor is not valid');
test.todo(
	'request from suspended actor is not valid, but will pretend to be processed'
);
test.todo(
	'request from unactivated actor is not valid, but will pretend to be processed'
);
test.todo('request with invalid signature is not valid');
test.todo(
	'request with valid signature (and passed the other checks) is valid'
);

await db.destroy();
