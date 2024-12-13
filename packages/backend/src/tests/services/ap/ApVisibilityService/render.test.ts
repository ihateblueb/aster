import { expect, test } from 'vitest';

import ApVisibilityService from '../../../../services/ap/ApVisibilityService.js';
import UserService from '../../../../services/UserService.js';
import db from '../../../../utils/database.js';

await db.initialize();

const instanceactor = await UserService.get({ username: 'instanceactor' });

const apvis1 = await ApVisibilityService.render('fakeid', {
	visibility: 'public'
});
const apvis2 = await ApVisibilityService.render(instanceactor.id, {
	visibility: 'public'
});
const apvis3 = await ApVisibilityService.render(instanceactor.id, {
	visibility: 'unlisted'
});
const apvis4 = await ApVisibilityService.render(instanceactor.id, {
	visibility: 'followers'
});
/*
const apvis5 = await ApVisibilityService.render(instanceactor, {
    visibility: 'direct'
})
*/

test('no actor returns to nobody cc nobody', () => {
	expect(apvis1).toStrictEqual({
		to: [],
		cc: []
	});
});

test('public returns to public cc nobody', () => {
	expect(apvis2).toStrictEqual({
		to: ['https://www.w3.org/ns/activitystreams#Public'],
		cc: []
	});
});

test('unlisted returns to public cc nobody', () => {
	expect(apvis3).toStrictEqual({
		to: [instanceactor.followersUrl],
		cc: ['https://www.w3.org/ns/activitystreams#Public']
	});
});

test('followers returns to public cc nobody', () => {
	expect(apvis4).toStrictEqual({
		to: [instanceactor.followersUrl],
		cc: []
	});
});

/*
test('direct returns to actor cc nobody', () => {
	expect(apvis5).toStrictEqual({
        to: [],
        cc: []
    });
});
*/

await db.destroy();
