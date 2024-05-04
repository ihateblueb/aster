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
		author: {
			type: 'varchar',
			nullable: true
		},
		local: {
			type: 'varchar',
			nullable: true
		},
		cw: {
			type: 'text',
			nullable: true
		},
		replying_to: {
			type: 'varchar',
			nullable: true
		},
		content: {
			type: 'text',
			nullable: true
		},
		created_at: {
			type: 'varchar',
			nullable: true
		}
	}
});
