export default async function IPDelete(body) {
	// disabled because this deletes actor no matter what even though it could be a deleted note
	/*

		let grabbedRemoteActor = await db.getRepository('users').findOne({
			where: {
				ap_id: parsedBody.actor
			}
		});

		if (grabbedRemoteActor) {
			await db.getRepository('users').delete(grabbedRemoteActor.id);
			logger('info', 'ap', 'deleted ' + parsedBody.actor);
			return {
				status: 200,
				message: 'Actor deleted'
			};
		} else {
			logger(
				'debug',
				'ap',
				'accepted deletion of ' +
					parsedBody.actor +
					' even though it was not present'
			);
			return {
				status: 200,
				message: 'Pretended to delete actor'
			};
		}
		*/
	return {
		status: 501,
		message: 'Not implemented'
	};
}
