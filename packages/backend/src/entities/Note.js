const EntitySchema = require('typeorm').EntitySchema

module.exports = new EntitySchema({
	name: 'note',
	tableName: 'notes',
	columns: {
		id: {
			primary: true,
			type: 'int',
			generated: true
		},
		timeposted: {
			type: 'varchar'
		},
		author: {
			type: 'varchar'
		},
		content: {
			type: 'text'
		}
	}
})
