const router = require('express').Router();

const config = require('../util/config.js');
const db = require('../util/database.ts');

router.get('/users/:userid', async (req, res) => {
	if (!req.params.userid) {
		return res.status(400).send('Bad request');
	} else {
		var grabbedUser = await db.getRepository('users').find({
			where: {
				id: Number(req.params.userid)
			}
		});

		var grabbedUser = grabbedUser[0];

		if (grabbedUser) {
			res.setHeader('Content-Type', 'application/activity+json');
			res.json({
				'@context': [
					'https://www.w3.org/ns/activitystreams',
					'https://w3id.org/security/v1'
				],

				id: `${config.url}users/${grabbedUser.id}`,
				type: 'Person',
				preferredUsername: `${grabbedUser.username}`,
				name: `${grabbedUser.displayname}`,
				inbox: `${config.url}users/${grabbedUser.id}/inbox`,
				summary: `${grabbedUser.bio}`,

				publicKey: {
					id: `${config.url}users/${grabbedUser.id}#main-key`,
					owner: `${config.url}users/${grabbedUser.id}`,
					publicKeyPem: `${grabbedUser.publickey}`
				}
			});
		} else {
			return res.status(404).send('Not found');
		}
	}
});

module.exports = router;
