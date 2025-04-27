import { expect, test } from 'vitest';

import MfmService from '../../../services/MfmService.js';

test('mention with local host has host removed when localized', () => {
	expect(
		MfmService.extractMentions(
			'hello @blueb@remlit.site blah lblah bksldfjsdlfkdsl hello to @test@remlit.site as well'
		)
	).toStrictEqual(['@blueb@remlit.site', '@test@remlit.site']);
});
