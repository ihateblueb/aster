import test from 'ava';
import { registerCompletionHandler } from 'ava';
import db from '../../../../utils/database.js';

import config from "../../../../utils/config.js";
import ApValidationService from '../../../../services/ap/ApValidationService.js';

await db.initialize()

const url = new URL(config.url);
let req = new Request(new URL(url).href + 'inbox')

const apvs1 = await ApValidationService.validSignature(req)

req.headers.append('host', 'improper host')
const apvs2 = await ApValidationService.validSignature(req)

req.headers.set('host', new URL(config.url).host)
const apvs3 = await ApValidationService.validSignature(req)

req.headers.append('digest', 'improper digest')
const apvs4 = await ApValidationService.validSignature(req)

req.headers.set('digest', 'SHA-256=improper digest')
const apvs5 = await ApValidationService.validSignature(req)

//req.headers.set('digest', new URL(config.url).host)
//const apvs6 = await ApValidationService.validSignature(req)

test.todo('request without host is not valid');
test.todo('request with invalid host is not valid');
test.todo('request without digest is not valid');
test.todo('request without digest starting with SHA-256= is not valid');
test.todo('request without signature is not valid');
test.todo('request with invalid digest is not valid');
test.todo('request with unparsable signature');
test.todo('request with signature without keyId is not valid');
test.todo('request without resolvable actor in keyId is not valid');
test.todo('post request from no accept instance is blocked');
test.todo('get request from no return instance is blocked');
test.todo('request with Delete activity from not found actor is not valid, but will pretend to be processed');
test.todo('request from not found actor is not valid');
test.todo('request from suspended actor is not valid, but will pretend to be processed');
test.todo('request from unactivated actor is not valid, but will pretend to be processed');
test.todo('request with invalid signature is not valid');
test.todo('request with valid signature (and passed the other checks) is valid');

await db.destroy()

registerCompletionHandler(() => {
	process.exit();
});