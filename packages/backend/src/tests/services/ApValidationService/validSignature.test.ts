import test from 'ava';
import { registerCompletionHandler } from 'ava';
import db from '../../../utils/database.js';

import config from "../../../utils/config.js";
import ApValidationService from '../../../services/ap/ApValidationService.js';

await db.initialize()

const url = new URL(config.url);
let req = new Request(new URL(url).href + 'inbox')

test.todo('request without host is not valid');
test.todo('request with invalid host is not valid');
test.todo('request without digest is not valid');
test.todo('request without digest starting with SHA-256= is not valid');

await db.destroy()

registerCompletionHandler(() => {
	process.exit();
});