import { expect, test } from 'vitest';

import ValidationService from '../../../services/ValidationService.js';

const vs1 = ValidationService.validUrl('random string');
const vs2 = ValidationService.validUrl('https://example.com/');
const vs3 = ValidationService.validUrl('sftp://example@example.com');

test('random string is not valid', () => {
	expect(vs1).toBe(false);
});

test('url string is valid', () => {
	expect(vs2).toBe(true);
});

test('non-http/https protocol is not valid', () => {
	expect(vs3).toBe(false);
});
