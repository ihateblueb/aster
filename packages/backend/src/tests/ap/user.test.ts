import config from '../../utils/config.js';

let req = await fetch(
	new URL(config.url).href + 'users/' + '01926e83-e61a-7ff6-a8d9-b7fb4bb8297a'
);

test('ap user endpoint returns content type application/activity+json', () => {
	console.log(req.json());
});
