import Logger from '../logger.js';
import config from '../config.js';
import getRemoteInstance from './getRemoteInstance.js';

import IAccept from '../../incoming/accept.js';
import IAdd from '../../incoming/add.js';
import IAnnounce from '../../incoming/announce.js';
import IBite from '../../incoming/bite.js';
import IBlock from '../../incoming/block.js';
import ICreate from '../../incoming/create.js';
import IDelete from '../../incoming/delete.js';
import IEmojiReact from '../../incoming/emojireact.js';
import IFollow from '../../incoming/follow.js';
import ILike from '../../incoming/like.js';
import IMove from '../../incoming/move.js';
import IUndo from '../../incoming/undo.js';
import IUpdate from '../../incoming/update.js';

export default async function acceptInboxRequest(parsedBody) {
	Logger.debug('ap', 'activity of type ' + parsedBody.type + ' received');

	await getRemoteInstance(new URL(parsedBody.id).host);

	if (config.get().plugins.incoming) {
		await config.get().plugins.incoming.forEach(async (e) => {
			await import(`../../plugins/incoming/${e}.js`).then(
				async (plugin) => {
					await plugin.default();
				}
			);
		});
	}

	if (parsedBody.type === 'Accept') {
		await IAccept(parsedBody);
	} else if (parsedBody.type === 'Announce') {
		await IAnnounce(parsedBody);
	} else if (parsedBody.type === 'Bite') {
		await IBite(parsedBody);
	} else if (parsedBody.type === 'Create') {
		await ICreate(parsedBody);
	} else if (parsedBody.type === 'Delete') {
		await IDelete(parsedBody);
	} else if (parsedBody.type === 'Follow') {
		await IFollow(parsedBody);
	} else if (parsedBody.type === 'Update') {
		await IUpdate(parsedBody);
	} else if (parsedBody.type === 'Undo') {
		await IUndo(parsedBody);
	} else if (parsedBody.type === 'Like') {
		await ILike(parsedBody);
	} else if (parsedBody.type === 'EmojiReact') {
		await IEmojiReact(parsedBody);
	} else if (parsedBody.type === 'Add') {
		await IAdd(parsedBody);
	} else if (parsedBody.type === 'Block') {
		await IBlock(parsedBody);
	} else if (parsedBody.type === 'Move') {
		await IMove(parsedBody);
	} else {
		Logger.warn(
			'ap',
			'new activity of type ' +
				parsedBody.type +
				" received that isn't known to aster."
		);
	}
}
