const EntitySchema = require('typeorm').EntitySchema;

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
			type: 'varchar',
			nullable: true
		},
		author: {
			type: 'varchar',
			nullable: true
		},
		content: {
			type: 'text',
			nullable: true
		}
	}
});