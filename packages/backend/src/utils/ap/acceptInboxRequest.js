const { parse } = require('@peertube/http-signature');
const config = require('../config.js');
const db = require('../database.ts');

async function acceptInboxRequest(parsedBody, res) {
	if (parsedBody.type === 'Follow') {
		console.log('[ap] follow request received!');

		var grabbedLocalUser = await db.getRepository('users').find({
			where: {
				ap_id: parsedBody.object
			}
		});

		var grabbedLocalUser = grabbedLocalUser[0];

		if (!grabbedLocalUser) {
			console.log('local user not here!');
		}

		if (grabbedLocalUser.locked) {
			// do NOT !!
		} else {
			// accept
		}
	} else if (parsedBody.type === 'Delete') {
		var grabbedActor = await db.getRepository('users').delete({
			where: {
				ap_id: parsedBody.actor
			}
		});

		console.log('[ap] deleted ' + parsedBody.actor);

		return res.status(200).send();
	}
}

module.exports = acceptInboxRequest;
