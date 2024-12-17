import { Command } from 'commander';

import db from '../utils/database.js';

const program = new Command();

program
	.name('aster-cli')
	.description('command line interface for managing an aster install')
	.version('0.8.0');

await db.initialize();

program
	.command('migrate')
	.description('run database migrations')
	.argument('[transaction]', 'all, none, or each. default: all')
	.argument(
		'[fake]',
		"whether or not to pretend to run the migration, but don't actually change the database. default: false"
	)
	.action(async (transaction?: 'all' | 'none' | 'each', fake?: boolean) => {
		await db.runMigrations({
			transaction: transaction ?? 'all',
			fake: fake ?? false
		});
	});

program.parse();
