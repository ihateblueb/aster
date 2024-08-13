import process from 'process';
import { Command } from 'commander';

process.title = 'Aster CLI';

import setup from './commands/setup.js';
import userCreate from './commands/user/create.js';

let program = new Command();

program.name('aster-cli');

program.addCommand(
	new Command('setup')
		.description('initial setup for an instance')
		.action(() => {
			setup();
		})
);

program.addCommand(
	new Command('user').description('commands to manage users').addCommand(
		new Command('create')
			.description('create a user')
			.option('-u, --username <username>', 'set the users username')
			.option('-p, --password <password>', 'set the users password')
			.option(
				'-d, --displayname <displayname>',
				'set the users displayname'
			)
			.option(
				'-l, --locked <locked>',
				'set if the user needs to accept follow requests',
				'true'
			)
			.option(
				'-s, --suspended <suspended>',
				'set if the user is suspended or not',
				'false'
			)
			.option(
				'-e, --deactivated <deactivated>',
				'set if the user is deactivated or not',
				'false'
			)
			.option(
				'-v, --discoverable <discoverable>',
				'set if the user is discoverable or not',
				'true'
			)
			.option(
				'-m, --automated <automated>',
				'set if the user should be marked as a robot or not',
				'false'
			)
			.option('-b, --bio <bio>', 'set the users bio')
			.option(
				'-c, --is_cat <is_cat>',
				'set if the user should be marked as a cat',
				'false'
			)
			.option(
				'-k, --speak_as_cat <speak_as_cat>',
				'set if the users text should be converted into cat',
				'false'
			)
			.option(
				'-a, --admin <admin>',
				'set if the user should be an admin',
				'false'
			)
			.option(
				'-o, --mod <mod>',
				'set if the user should be a mod',
				'false'
			)
			.action((options) => {
				userCreate(options);
			})
	)
);

program.addCommand(
	new Command('note').description('commands to manage notes').addCommand(
		new Command('create').description('create a note').action((options) => {
			console.log(options);
		})
	)
);

program.parse();
