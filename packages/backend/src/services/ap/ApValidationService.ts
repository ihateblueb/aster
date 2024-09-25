import logger from '../../utils/logger.js';
import config from '../../utils/config.js';

import crypto from 'crypto';
import httpSignature from '@peertube/http-signature';

import getRemoteActor from '../../utils/ap/getRemoteActor.js';

let validApObjectTypes = [
	// actor
	'Person',
	'Service',

	// note
	'Note',
	'Question',

	// activity
	'Accept',
	'Reject',
	'Add',
	'Remove',
	'Create',
	'Delete',
	'Update',
	'Undo',
	'Follow',
	'Block',
	'Move',
	'Like',
	'EmojiReact',
	'Announce',

	// other
	'OrderedCollection',

	// valid but unprocessed
	'Read',
	'View'
];

class ApValidationService {
	public isValidObject(body) {
		if (body.type) {
			logger.debug(
				'validation',
				'activity type present (' + body.type + ')'
			);

			if (validApObjectTypes.includes(body.type)) {
				logger.debug(
					'validation',
					'activity type is valid (' + body.type + ')'
				);

				// TODO: this is probably wrong checking, see spec or something
				if (
					body.type === 'Undo' ||
					body.type === 'Create' ||
					body.type === 'Announce' ||
					body.type === 'Delete'
				) {
					if (validApObjectTypes.includes(body.object.type)) {
						logger.debug(
							'validation',
							'nested activity type is valid (' + body.type + ')'
						);
						return true;
					} else {
						return false;
					}
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	public async isValidRequest(req) {
		if (!req.headers.host) {
			logger.error('ap', 'no host present');
			return false;
		} else {
			logger.debug('ap', 'host present');
		}

		if (req.headers.host !== new URL(config.get().url).host) {
			logger.error('ap', 'host header did not match configuration');
			return false;
		} else {
			logger.debug('ap', 'host header matches configuration');
		}

		if (!req.body) {
			logger.error('ap', 'body not present');
			return false;
		} else {
			logger.debug('ap', 'body present');
		}

		if (!req.headers.digest) {
			logger.error('ap', 'digest not present');
			return false;
		} else {
			logger.debug('ap', 'digest present');
		}

		if (!req.headers.digest.startsWith('SHA-256=')) {
			logger.error('ap', 'digest did not start with SHA-256=');
			return false;
		} else {
			logger.debug('ap', 'digest started with SHA-256=');
		}

		if (!req.headers.signature) {
			logger.error('ap', 'signature header not present');
			return false;
		} else {
			logger.debug('ap', 'signature header present');
		}

		let digestValid = this.isValidDigest(
			req,
			req.headers.digest.replace('SHA-256=', '')
		);

		if (!digestValid) {
			logger.error('ap', 'digest invalid');
			return false;
		} else {
			logger.debug('ap', 'digest valid');
		}

		// todo: kill this fuckjing God damn thing
		let actor = await getRemoteActor(JSON.parse(req.body).actor);

		if (!actor) {
			logger.error('ap', 'actor not properly grabbed');
			return false;
		} else if (actor === 'gone') {
			return true;
		} else if (actor.suspended) {
			return true;
		} else {
			let parsedRequest = httpSignature.parseRequest(req, {
				headers: ['(request-target)', 'digest', 'host', 'date']
			});
			let signatureVerified = httpSignature.verifySignature(
				parsedRequest,
				actor.public_key
			);

			if (signatureVerified) {
				logger.debug('ap', 'signature verified');
				return true;
			} else {
				logger.error('ap', 'signature verification failed');
				return false;
			}
		}
	}

	public isValidDigest(req, digest): boolean {
		return (
			crypto.createHash('sha256').update(req.body).digest('base64') ===
			digest
		);
	}
}

export default new ApValidationService();
