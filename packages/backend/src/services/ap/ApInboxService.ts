import ApValidationService from './ApValidationService.js';
import logger from '../../utils/logger.js';

type InboxResponse = {
	status: number;
	message?: string;
};

class ApInboxService {
	public async process(body: any): Promise<InboxResponse> {
		if (!ApValidationService.isValidObject(body))
			return { status: 400, message: 'Invalid object' };

		if (body.type === 'Accept') {
			return { status: 501 };
		} else if (body.type === 'Reject') {
			return { status: 501 };
		} else if (body.type === 'Announce') {
			return { status: 501 };
		} else if (body.type === 'Bite') {
			return { status: 501 };
		} else if (body.type === 'Create') {
			return { status: 501 };
		} else if (body.type === 'Delete') {
			return { status: 501 };
		} else if (body.type === 'Follow') {
			return { status: 501 };
		} else if (body.type === 'Update') {
			return { status: 501 };
		} else if (body.type === 'Undo') {
			return { status: 501 };
		} else if (body.type === 'Like') {
			return { status: 501 };
		} else if (body.type === 'EmojiReact') {
			return { status: 501 };
		} else if (body.type === 'Add') {
			return { status: 501 };
		} else if (body.type === 'Remove') {
			return { status: 501 };
		} else if (body.type === 'Block') {
			return { status: 501 };
		} else if (body.type === 'Move') {
			return { status: 501 };
		} else {
			logger.warn(
				'ap',
				'unknown activity type ' + body.type + ' received'
			);
			return { status: 501 };
		}
	}
}

export default new ApInboxService();
