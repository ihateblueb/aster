import test from 'ava';
import { registerCompletionHandler } from 'ava';
import db from '../../../../utils/database.js';
import ApVisibilityService from '../../../../services/ap/ApVisibilityService.js';
import UserService from '../../../../services/UserService.js';

await db.initialize()

const instanceactor = await UserService.get({ username: 'instanceactor' })

const apvis1 = await ApVisibilityService.determine({
})
const apvis2 = await ApVisibilityService.determine({
    actor: instanceactor.apId
})
const apvis3 = await ApVisibilityService.determine({
    actor: instanceactor.apId,
    to: [
        instanceactor.followersUrl
    ],
    cc: []
})
const apvis4 = await ApVisibilityService.determine({
    actor: instanceactor.apId,
    to: [
        instanceactor.followersUrl
    ],
    cc: [
        'https://www.w3.org/ns/activitystreams#Public'
    ]
})
const apvis5 = await ApVisibilityService.determine({
    actor: instanceactor.apId,
    to: [
        'https://www.w3.org/ns/activitystreams#Public'
    ],
    cc: []
})
const apvis6 = await ApVisibilityService.determine({
    actor: instanceactor.apId,
    to: [
        'https://www.w3.org/ns/activitystreams#Public'
    ],
    cc: [
        instanceactor.followersUrl
    ]
})
const apvis7 = await ApVisibilityService.determine({
    actor: instanceactor.apId,
    to: [
        'https://www.w3.org/ns/activitystreams#Public'
    ],
    cc: [
        'https://www.w3.org/ns/activitystreams#Public'
    ]
})
const apvis8 = await ApVisibilityService.determine({
    actor: instanceactor.apId,
    to: [
        'https://www.w3.org/ns/activitystreams#Public',
        instanceactor.apId
    ],
    cc: [
    ]
})
const apvis9 = await ApVisibilityService.determine({
    actor: instanceactor.apId,
    to: [
        'https://www.w3.org/ns/activitystreams#Public'
    ],
    cc: [
        instanceactor.followersUrl,
        instanceactor.apId
    ]
})
const apvis10 = await ApVisibilityService.determine({
    actor: instanceactor.apId,
    to: [
        'https://www.w3.org/ns/activitystreams#Public',
        instanceactor.followersUrl
    ],
    cc: [
        instanceactor.followersUrl,
        instanceactor.followersUrl,
        instanceactor.apId
    ]
})

test('no actor returns direct', t => {
	t.like(apvis1, {
        visibility: 'direct',
        to: undefined
    });
});

test('actor but no to/cc returns direct', t => {
	t.like(apvis2, {
        visibility: 'direct',
        to: undefined
    });
});

test('to (followers) cc (nobody) returns followers', t => {
	t.like(apvis3, {
        visibility: 'followers',
        to: undefined
    });
});

test('to (followers) cc (public) returns unlisted', t => {
	t.like(apvis4, {
        visibility: 'unlisted',
        to: undefined
    });
});

test('to (public) cc (nobody) returns public', t => {
	t.like(apvis5, {
        visibility: 'public',
        to: undefined
    });
});

test('to (public) cc (followers) returns public', t => {
	t.like(apvis6, {
        visibility: 'public',
        to: undefined
    });
});

test('to (public) cc (public) returns public', t => {
	t.like(apvis7, {
        visibility: 'public',
        to: undefined
    });
});

test('to (public, actor) cc (nobody) returns public and to actor', t => {
	t.like(apvis8, {
        visibility: 'public',
        to: [
            instanceactor.id
        ]
    });
});

test('to (public) cc (followers, actor) returns public and to actor', t => {
	t.like(apvis9, {
        visibility: 'public',
        to: [
            instanceactor.id
        ]
    });
});

test('to (public, followers) cc (followers, followers, actor) returns public and to actor', t => {
	t.like(apvis10, {
        visibility: 'public',
        to: [
            instanceactor.id
        ]
    });
});

await db.destroy()

registerCompletionHandler(() => {
	process.exit();
});