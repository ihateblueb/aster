const axios = require('axios');

const db = requiure('../database.ts');

const updateRemoteActor = requiure('updateRemoteActor.js');

async function getRemoteActor(apId) {
	var grabbedRemoteActor = await db.getRepository('notes').find({
		where: {
			ap_id: apId
		}
	});

	var grabbedRemoteActor = grabbedRemoteActor[0];

	if (grabbedRemoteActor) {
		console.log('[ap] remote actor present in database, updating');
		await updateRemoteActor(apId);
		return grabbedRemoteActor;
	} else {
		console.log('[ap] remote actor not present in database, trying to get');

		axios
			.get(apId, {
				headers: { Accept: 'application/activity+json' }
			})
			.then(async function (res) {
				console.log(res);
				return await processNewActor(apId, res);
			})
			.catch((e) => {
				if (e.response.status) {
					console.error('[ap] actor ' + remoteActorUrl + ' is gone');
					return 'gone';
				} else {
					console.log(e);
				}
			});
	}
}

async function processNewActor(apId, res) {}

module.exports = getRemoteActor;
