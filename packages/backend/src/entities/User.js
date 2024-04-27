const EntitySchema = require('typeorm').EntitySchema

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
			type: 'varchar'
		},
		displayName: {
			type: 'varchar'
		},
		avatar: {
			type: 'text'
		},
		bio: {
			type: 'text'
		},
		local: {
			type: 'boolean'
		},
		publicKey: {
			type: 'text'
		}
	}
})
