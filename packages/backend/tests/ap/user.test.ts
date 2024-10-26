import config from '../../built/utils/config.js';

let req = fetch(new URL(config.url).href + 'users/');

test('ap user endpoint returns content type application/activity+json', () => {});
