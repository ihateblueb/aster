const router = require('express').Router()

const config = require('../util/config.js')
const db = require('../util/database.ts')

const { User } = require('../entities/User.js')

router.get('/users/:userid', async (req, res) => {
	if (!req.params.userid) {
		return res.status(400).send('Bad request')
	} else {
		const grabbedUser = await db
			.getRepository(User)
			.createQueryBuilder('user')
			.where('user.id = :id', { id: req.params.userid })
			.getOne()

		console.log(grabbedUser.User)

		if (grabbedUser) {
			res.json({
				'@context': [
					'https://www.w3.org/ns/activitystreams',
					'https://w3id.org/security/v1'
				],

				id: `${config.url}users/blueb`,
				type: 'Person',
				preferredUsername: 'blueb',
				inbox: `${config.url}users/blueb/inbox`,
				summary: '<p>testing a bio <i>:3c</i></p>',
				_misskey_summary: 'testing a bio $[tada :3c]',

				icon: {
					type: 'Image',
					mediaType: 'image/png',
					url: 'https://blob.jortage.com/blob2/fLyNA8vJT2MZEwU7/r_Ir5F_74e8SJyGgu0wOSlC87PLkRcWCsLaUkrYb1Pc7-ENDqrs-81vQPoLdc9/ogpaDGIw.png'
				},

				publicKey: {
					id: `${config.url}users/blueb#main-key`,
					owner: `${config.url}users/blueb`,
					publicKeyPem:
						'-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo6x7mU1kZXOcyOGyzMzL RL3X/5Jt21asBxMQaFbZokOD+C6lBP6zm/RcM+lVOf12JCdHCNWLsBMPRUxJuXHU IR8M+5RvBMuvW6gtKHlj4u7AZESo4oEoqqgHF+IqFaJArXHTWom/8h3hLoUEEyfz FpbRp2bpvOMW0WevoAAtxJh0dk0kQXrFiM9fNi+l1SvXjjm2aY8+VmSC4t8Ew402 sVmoP25b10GjfamTDq+hZ060zgyHIt4P4lp7+mDQXqZMGCDzo8RidmkyWbo+1APd 9MmeN+o0ZrJzjU/D9PAelsyhjQVt0itl6kYB20ZyZLOOmn6+/lnJCLfiMyMduqGE WwIDAQAB-----END PUBLIC KEY-----'
				}
			})
		}
	}
})

module.exports = router
