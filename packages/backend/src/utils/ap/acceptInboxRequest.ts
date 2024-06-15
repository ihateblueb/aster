import db from '../database.js';
import logger from '../logger.js';

import IPAccept from './inboxProcessors/accept.js';
import IPAdd from './inboxProcessors/add.js';
import IPAnnounce from './inboxProcessors/announce.js';
import IPBite from './inboxProcessors/bite.js';
import IPBlock from './inboxProcessors/block.js';
import IPCreate from './inboxProcessors/create.js';
import IPDelete from './inboxProcessors/delete.js';
import IPEmojiReact from './inboxProcessors/emojireact.js';
import IPFollow from './inboxProcessors/follow.js';
import IPLike from './inboxProcessors/like.js';
import IPMove from './inboxProcessors/move.js';
import IPUndo from './inboxProcessors/undo.js';
import IPUpdate from './inboxProcessors/update.js';

/*
	Done activity types:

	Follow
	- without approval
	Undo
	- follow

	Todo activity types:

	Accept
	Announce
	Create
	Follow
	- with approval
	Update
	Undo
	Like
	EmojiReact
	Add
	Block
	Move

	Activities to ignore:

	CacheFile
	View
*/

export default async function acceptInboxRequest(parsedBody) {
	logger('debug', 'ap', 'activity of type ' + parsedBody.type + ' received');

	if (parsedBody.type === 'Accept') {
		await IPAccept(parsedBody);
	} else if (parsedBody.type === 'Announce') {
		await IPAnnounce(parsedBody);
	} else if (parsedBody.type === 'Bite') {
		await IPBite(parsedBody);
	} else if (parsedBody.type === 'Create') {
		await IPCreate(parsedBody);
	} else if (parsedBody.type === 'Delete') {
		await IPDelete(parsedBody);
	} else if (parsedBody.type === 'Follow') {
		await IPFollow(parsedBody);
	} else if (parsedBody.type === 'Update') {
		await IPUpdate(parsedBody);
	} else if (parsedBody.type === 'Undo') {
		await IPUndo(parsedBody);
	} else if (parsedBody.type === 'Like') {
		await IPLike(parsedBody);
	} else if (parsedBody.type === 'EmojiReact') {
		await IPEmojiReact(parsedBody);
	} else if (parsedBody.type === 'Add') {
		await IPAdd(parsedBody);
	} else if (parsedBody.type === 'Block') {
		await IPBlock(parsedBody);
	} else if (parsedBody.type === 'Move') {
		await IPMove(parsedBody);
	} else {
		console.log('oh god oh fuck new activity type ' + parsedBody.type);
	}
}
