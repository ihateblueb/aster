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
		avatar: {
			type: 'text',
			nullable: true
		},
		bio: {
			type: 'text',
			nullable: true
		},
		local: {
			type: 'boolean',
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
