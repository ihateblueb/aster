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
		created_at: {
			type: 'varchar',
			nullable: true
		},
		author: {
			type: 'varchar',
			nullable: true
		},
		local: {
			type: 'varchar',
			nullable: true
		},
		content: {
			type: 'text',
			nullable: true
		},
		cw: {
			type: 'text',
			nullable: true
		}
	}
});
