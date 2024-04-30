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
		ap_id: {
			type: 'varchar',
			nullable: true
		},
		local: {
			type: 'boolean',
			nullable: true,
			default: false
		},
		url: {
			type: 'varchar',
			nullable: true
		},
		displayname: {
			type: 'varchar',
			nullable: true
		},
		locked: {
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
		is_cat: {
			type: 'boolean',
			default: false
		},
		speak_as_cat: {
			type: 'boolean',
			default: false
		},
		created_at: {
			type: 'varchar',
			nullable: true
		},
		public_key: {
			type: 'text',
			nullable: true
		},
		private_key: {
			type: 'text',
			nullable: true
		}
	}
});
