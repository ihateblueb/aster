import logger from '../../utils/logger.js';
import AcceptProcessor from './inbox/AcceptProcessor.js';
import AddProcessor from './inbox/AddProcessor.js';
import AnnounceProcessor from './inbox/AnnounceProcessor.js';
import CreateProcessor from './inbox/CreateProcessor.js';
import DeleteProcessor from './inbox/DeleteProcessor.js';
import FollowProcessor from './inbox/FollowProcessor.js';
import LikeProcessor from './inbox/LikeProcessor.js';
import RejectProcessor from './inbox/RejectProcessor.js';
import RemoveProcessor from './inbox/RemoveProcessor.js';
import UndoProcessor from './inbox/UndoProcessor.js';
import UpdateProcessor from './inbox/UpdateProcessor.js';

class ApInboxService {
	public async process(body: ApObject) {
		if (body.type === 'Accept') {
			await AcceptProcessor.process(body);
		} else if (body.type === 'Add') {
			await AddProcessor.process(body);
		} else if (body.type === 'Announce') {
			await AnnounceProcessor.process(body);
		} else if (body.type === 'Create') {
			await CreateProcessor.process(body);
		} else if (body.type === 'Delete') {
			await DeleteProcessor.process(body);
		} else if (body.type === 'Follow') {
			await FollowProcessor.process(body);
		} else if (body.type === 'Like') {
			await LikeProcessor.process(body);
		} else if (body.type === 'Reject') {
			await RejectProcessor.process(body);
		} else if (body.type === 'Remove') {
			await RemoveProcessor.process(body);
		} else if (body.type === 'Undo') {
			await UndoProcessor.process(body);
		} else if (body.type === 'Update') {
			await UpdateProcessor.process(body);
		} else {
			logger.warn(
				'inbox',
				'received activity of type ' +
					body.type +
					' that has no processor'
			);

			return 'Unprocessed';
		}

		return 202;
	}
}

export default new ApInboxService();
