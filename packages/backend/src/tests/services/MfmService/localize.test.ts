import { expect, test } from 'vitest';

import ConfigService from '../../../services/ConfigService.js';
import MfmService from '../../../services/MfmService.js';

test('mention with no host is given host when localized', () => {
	expect(
		MfmService.localize('@user @user@false.example.com', 'example.com')
	).toBe('@user@example.com @user@false.example.com');
});

test('mention with local host has host removed when localized', () => {
	expect(
		MfmService.localize(
			'@user@' + ConfigService.url.host + ' @user@false.example.com',
			'example.com'
		)
	).toBe('@user @user@false.example.com');
});
