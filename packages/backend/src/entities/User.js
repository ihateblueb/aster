const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
	name: 'user',
	tableName: 'users',
	columns: {
		id: {
			primary: true,
			type: 'int',
			generated: true
		},
		username: {
			type: 'varchar',
			nullable: true
		},
		// activitypub id (eg. https://as.blueb.me/users/1)
		apid: {
			type: 'varchar',
			nullable: true
		},
		local: {
			type: 'boolean',
			nullable: true,
			default: false
		},
		displayname: {
			type: 'varchar',
			nullable: true
		},
		followerapproval: {
			type: 'boolean',
			default: false
		},
		suspended: {
			type: 'boolean',
			default: false
		},
		deactivated: {
			type: 'boolean',
			default: false
		},
		discoverable: {
			type: 'boolean',
			default: true
		},
		automated: {
			type: 'boolean',
			default: false
		},
		avatar: {
			type: 'text',
			nullable: true
		},
		banner: {
			type: 'text',
			nullable: true
		},
		background: {
			type: 'text',
			nullable: true
		},
		bio: {
			type: 'text',
			nullable: true
		},
		iscat: {
			type: 'boolean',
			default: false
		},
		speakascat: {
			type: 'boolean',
			default: false
		},
		createdat: {
			type: 'varchar',
			nullable: true
		},
		publickey: {
			type: 'text',
			nullable: true
		},
		privatekey: {
			type: 'text',
			nullable: true
		}
	}
});
