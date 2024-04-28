const router = require('express').Router()

const config = require('../util/config.js')
const db = require('../util/database.ts')

router.get('/users/:userid', async (req, res) => {
	if (!req.params.userid) {
		return res.status(400).send('Bad request')
	} else {
		const grabbedUser = await db.getRepository('users').find({
			where: {
				id: Number(req.params.userid)
			}
		})

		if (grabbedUser) {
			res.json({
				'@context': [
					'https://www.w3.org/ns/activitystreams',
					'https://w3id.org/security/v1'
				],

				id: `${config.url}users/${grabbedUser.User.id}`,
				type: 'Person',
				preferredUsername: `${grabbedUser.User.username}`,
				name: `${grabbedUser.User.displayname}`,
				inbox: `${config.url}users/${grabbedUser.User.id}/inbox`,
				summary: `${grabbedUser.User.bio}`,

				publicKey: {
					id: `${config.url}users/${grabbedUser.User.id}#main-key`,
					owner: `${config.url}users/${grabbedUser.User.id}`,
					publicKeyPem: `${grabbedUser.User.publickey}`
				}
			})
		}
	}
})

module.exports = router
