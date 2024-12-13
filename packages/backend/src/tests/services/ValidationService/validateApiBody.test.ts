import test from 'ava';
import { registerCompletionHandler } from 'ava';

import ValidationService from '../../../services/ValidationService.js';
import locale from '../../../utils/locale.js';

const vs1 = ValidationService.validateApiBody(undefined);
const vs2 = ValidationService.validateApiBody('random string');
const vs3 = ValidationService.validateApiBody('{ "one": two" }');

const validJson = {
	one: 'two',
	three: 'four'
};
const vs4 = ValidationService.validateApiBody(JSON.stringify(validJson));

test('undefined is not valid', (t) => {
	t.like(vs1, {
		error: true,
		status: 400,
		message: locale.error.bodyRequired
	});
});

test('random string is not valid', (t) => {
	t.like(vs2, {
		error: true,
		status: 400,
		message: locale.error.bodyInvalid
	});
});

test('invalid json is not valid', (t) => {
	t.like(vs3, {
		error: true,
		status: 400,
		message: locale.error.bodyInvalid
	});
});

test('valid json is valid', (t) => {
	t.like(vs4, {
		error: false,
		status: 200,
		body: validJson
	});
});

registerCompletionHandler(() => {
	process.exit();
});
