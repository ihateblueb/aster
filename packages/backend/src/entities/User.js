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
		displayname: {
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
		publickey: {
			type: 'text'
		}
	}
})
