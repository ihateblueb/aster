const axios = require('axios');

const config = require('../../utils/config.js');
const db = require('../../utils/database.ts');

const getRemoteActor = require('./getRemoteActor.js');

async function getKey(remoteActorUrl) {
	const returnedActor = await getRemoteActor(remoteActorUrl);

	if (returnedActor && returnedActor.publicKey.publicKeyPem) {
		console.log(returnedActor);
		return returnedActor.publicKey.publicKeyPem;
	} else {
		console.log('[ap] actor not returned properly or had no key');
	}
}

module.exports = getKey;
