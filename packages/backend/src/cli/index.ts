import { Command } from 'commander';

import CacheService from '../services/CacheService.js';
import logger from '../utils/logger.js';

const program = new Command();

program
	.name('aster-cli')
	.description('command line interface for managing an aster install')
	.version('0.8.0');

program
	.command('cacheClear')
	.description('removes all cached renders')
	.action(async () => {
		logger.info('cache', 'clearing cache');
		await CacheService.clear();
	});

program.parse();
