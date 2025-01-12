import logger from '../../utils/logger.js';
import AcceptProcessor from './inbox/AcceptProcessor.js';
import AddProcessor from './inbox/AddProcessor.js';
import AnnounceProcessor from './inbox/AnnounceProcessor.js';
import BiteProcessor from './inbox/BiteProcessor.js';
import BlockProcessor from './inbox/BlockProcessor.js';
import CreateProcessor from './inbox/CreateProcessor.js';
import DeleteProcessor from './inbox/DeleteProcessor.js';
import FlagProcessor from './inbox/FlagProcessor.js';
import FollowProcessor from './inbox/FollowProcessor.js';
import LikeProcessor from './inbox/LikeProcessor.js';
import RejectProcessor from './inbox/RejectProcessor.js';
import RemoveProcessor from './inbox/RemoveProcessor.js';
import UndoProcessor from './inbox/UndoProcessor.js';
import UpdateProcessor from './inbox/UpdateProcessor.js';

class ApInboxService {
	public async process(body: ApObject) {
		if (body.type === 'Accept') return await AcceptProcessor.process(body);
		if (body.type === 'Add') return await AddProcessor.process(body);
		if (body.type === 'Announce')
			return await AnnounceProcessor.process(body);
		if (body.type === 'Bite') return await BiteProcessor.process(body);
		if (body.type === 'Block') return await BlockProcessor.process(body);
		if (body.type === 'Create') return await CreateProcessor.process(body);
		if (body.type === 'Delete') return await DeleteProcessor.process(body);
		if (body.type === 'Flag') return await FlagProcessor.process(body);
		if (body.type === 'Follow') return await FollowProcessor.process(body);
		if (body.type === 'Like') return await LikeProcessor.process(body);
		if (body.type === 'Reject') return await RejectProcessor.process(body);
		if (body.type === 'Remove') return await RemoveProcessor.process(body);
		if (body.type === 'Undo') return await UndoProcessor.process(body);
		if (body.type === 'Update') return await UpdateProcessor.process(body);

		logger.warn(
			'inbox',
			'received activity of type ' + body.type + ' that has no processor'
		);

		return 'Unprocessed';
	}
}

export default new ApInboxService();
