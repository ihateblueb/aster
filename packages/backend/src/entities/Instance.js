const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
	name: 'instance',
	tableName: 'instances',
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
		updated_at: {
			type: 'varchar',
			nullable: true
		},
		last_communicated: {
			type: 'varchar',
			nullable: true
		},
		user_count: {
			type: 'int',
			nullable: true
		},
		note_count: {
			type: 'int',
			nullable: true
		},
		responding: {
			type: 'bool',
			nullable: true,
			default: false
		},
		suspended: {
			type: 'bool',
			nullable: true,
			default: false
		},
		silenced: {
			type: 'bool',
			nullable: true,
			default: false
		},
		mod_note: {
			type: 'text',
			nullable: true
		},
		host: {
			type: 'text',
			nullable: true
		},
		name: {
			type: 'varchar',
			nullable: true
		},
		description: {
			type: 'text',
			nullable: true
		},
		color: {
			type: 'varchar',
			nullable: true
		},
		maintainer: {
			type: 'varchar',
			nullable: true
		},
		maintainer_email: {
			type: 'varchar',
			nullable: true
		},
		software: {
			type: 'varchar',
			nullable: true
		},
		version: {
			type: 'varchar',
			nullable: true
		},
		icon: {
			type: 'text',
			nullable: true
		},
		favicon: {
			type: 'text',
			nullable: true
		}
	}
});
