import test from 'ava';
import { registerCompletionHandler } from 'ava';
import db from '../../../../utils/database.js';
import ApVisibilityService from '../../../../services/ap/ApVisibilityService.js';
import UserService from '../../../../services/UserService.js';

await db.initialize()

const instanceactor = await UserService.get({ username: 'instanceactor' })

const apvis1 = await ApVisibilityService.render('fakeid', {
    visibility: 'public'
})
const apvis2 = await ApVisibilityService.render(instanceactor.id, {
    visibility: 'public'
})
const apvis3 = await ApVisibilityService.render(instanceactor.id, {
    visibility: 'unlisted'
})
const apvis4 = await ApVisibilityService.render(instanceactor.id, {
    visibility: 'followers'
})
/*
const apvis5 = await ApVisibilityService.render(instanceactor, {
    visibility: 'direct'
})
*/

test('no actor returns to nobody cc nobody', t => {
	t.like(apvis1, {
        to: [],
        cc: []
    });
});

test('public returns to public cc nobody', t => {
	t.like(apvis2, {
        to: ['https://www.w3.org/ns/activitystreams#Public'],
        cc: []
    });
});

test('unlisted returns to public cc nobody', t => {
	t.like(apvis3, {
        to: [instanceactor.followersUrl],
        cc: ['https://www.w3.org/ns/activitystreams#Public']
    });
});

test('followers returns to public cc nobody', t => {
	t.like(apvis4, {
        to: [instanceactor.followersUrl],
        cc: []
    });
});

/*
test('direct returns to actor cc nobody', t => {
	t.like(apvis5, {
        to: [],
        cc: []
    });
});
*/

await db.destroy()

registerCompletionHandler(() => {
	process.exit();
});