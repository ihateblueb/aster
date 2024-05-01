const axios = require('axios');

const config = require('../config.js');
const db = require('../database.ts');

const fetchRemoteActor = require('./fetchRemoteActor.js');

async function getRemoteActor(remoteActorUrl) {
	console.log('[ap] attempting to grab remote actor ' + remoteActorUrl);

	var grabbedUser = await db.getRepository('users').find({
		where: {
			ap_id: remoteActorUrl
		}
	});

	var grabbedUser = grabbedUser[0];

	if (grabbedUser) {
		console.log('[ap] actor ' + remoteActorUrl + ' exists in database');
		return grabbedUser;
	} else {
		fetchRemoteActor(remoteActorUrl);
	}
}

module.exports = getRemoteActor;
