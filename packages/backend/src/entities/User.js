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
		bio: {
			type: 'text',
			nullable: true
		},
		local: {
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
