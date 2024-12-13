import test from 'ava';
import { registerCompletionHandler } from 'ava';

import ApValidationService from '../../../../services/ap/ApValidationService.js';

const apvb1 = ApValidationService.validBody(undefined);
const apvb2 = ApValidationService.validBody({});
const apvb3 = ApValidationService.validBody({
	id: 'not a url'
});
const apvb4 = ApValidationService.validBody({
	id: 'https://example.com/notes/1'
});
const apvb5 = ApValidationService.validBody({
	id: 'https://example.com/notes/1',
	type: 'Note'
});

test('ap object with no body is not valid', (t) => {
	t.is(apvb1, false);
});

test('ap object with no id is not valid', (t) => {
	t.is(apvb2, false);
});

test('ap object with id that is unable to be parsed is not valid', (t) => {
	t.is(apvb3, false);
});

test('ap object without type is not valid', (t) => {
	t.is(apvb4, false);
});

test('ap object with type and valid id is valid', (t) => {
	t.is(apvb5, true);
});

registerCompletionHandler(() => {
	process.exit();
});
