import { expect, test } from 'vitest';

import WebfingerService from '../../services/WebfingerService';
import db from '../../utils/database.js';

await db.initialize();

let found = await WebfingerService.lookup('@blueb@remlit.site');

test('found user by webfinger lookup', () => {
	expect(found !== false);
});
