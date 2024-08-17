import Logger from './logger';

export default function statsUser(
	type: string,
	id: string,
	change: 'add' | 'remove' | 'clear',
	key: string,
	val?: number
) {
	if (type === 'note') {
		if (change === 'add') {
			Logger.debug(
				'stats',
				`note add for note ${id} on key ${key} change by ${val}`
			);
		} else if (change === 'remove') {
			Logger.debug(
				'stats',
				`note remove for note ${id} on key ${key} change by ${val}`
			);
		} else if (change === 'clear') {
			Logger.debug('stats', `note clear for note ${id} on ${key}`);
		}
	} else if (type === 'user') {
		if (change === 'add') {
			Logger.debug(
				'stats',
				`user add for user ${id} on key ${key} change by ${val}`
			);
		} else if (change === 'remove') {
			Logger.debug(
				'stats',
				`user remove for user ${id} on key ${key} change by ${val}`
			);
		} else if (change === 'clear') {
			Logger.debug('stats', `user clear for user ${id} on ${key}`);
		}
	}
}
