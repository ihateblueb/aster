import { expect, test } from 'vitest';

import ConfigService from '../../../services/ConfigService.js';
import MfmService from '../../../services/MfmService.js';

test('mention with no host is given host when localized', () => {
	expect(
		MfmService.localize('@user @user@second.example.com', 'example.com')
	).toBe('@user@example.com @user@second.example.com');
});

test('mention with local host has host removed when localized', () => {
	expect(
		MfmService.localize(
			'@user@' + ConfigService.url.host + ' @user@example.com',
			'example.com'
		)
	).toBe('@user @user@example.com');
});

test('deep mention with no host is given host when localized', () => {
	expect(
		MfmService.localize(
			'$[x2 $[x2 $[x2 @user] $[x2 @user@second.example.com]]]',
			'example.com'
		)
	).toBe(
		'$[x2 $[x2 $[x2 @user@example.com] $[x2 @user@second.example.com]]]'
	);
});

test('deep mention with local host has host removed when localized', () => {
	expect(
		MfmService.localize(
			'$[x2 $[x2 $[x2 @user@' +
				ConfigService.url.host +
				'] $[x2 @user@second.example.com]]]',
			'example.com'
		)
	).toBe('$[x2 $[x2 $[x2 @user] $[x2 @user@second.example.com]]]');
});
