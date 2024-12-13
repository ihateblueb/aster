import test from 'ava';
import { registerCompletionHandler } from 'ava';

import ValidationService from '../../../services/ValidationService.js';

const vs1 = ValidationService.validUrl('random string');
const vs2 = ValidationService.validUrl('https://example.com/');
const vs3 = ValidationService.validUrl('sftp://example@example.com');

test('random string is not valid', (t) => {
	t.is(vs1, false);
});

test('url string is not valid', (t) => {
	t.is(vs2, true);
});

test('non-http/https protocol is not valid', (t) => {
	t.is(vs3, false);
});

registerCompletionHandler(() => {
	process.exit();
});
