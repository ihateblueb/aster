import httpSignature from '@peertube/http-signature';
import crypto from 'crypto';

import config from '../../utils/config.js';
import logger from '../../utils/logger.js';
import ApActorService from './ApActorService.js';

class ApValidationService {
	public async validSignature(req, type: string): Promise<{ valid: boolean, pretendToProcess?: boolean }> {
		if (!req.headers.host) {
			logger.error('ap', 'no host present');
			return {
				valid: false
			};
		} else {
			logger.debug('ap', 'host present');
		}

		if (req.headers.host !== new URL(config.url).host) {
			logger.error('ap', 'host header did not match configuration');
			return {
				valid: false
			};
		} else {
			logger.debug('ap', 'host header matches configuration');
		}

		if (!req.body) {
			logger.error('ap', 'body not present');
			return {
				valid: false
			};
		} else {
			logger.debug('ap', 'body present');
		}

		if (!req.headers.digest) {
			logger.error('ap', 'digest not present');
			return {
				valid: false
			};
		} else {
			logger.debug('ap', 'digest present');
		}

		if (!req.headers.digest.startsWith('SHA-256=')) {
			logger.error('ap', 'digest did not start with SHA-256=');
			return {
				valid: false
			};
		} else {
			logger.debug('ap', 'digest started with SHA-256=');
		}

		if (!req.headers.signature) {
			logger.error('ap', 'signature header not present');
			return {
				valid: false
			};
		} else {
			logger.debug('ap', 'signature header present');
		}

		let digestValid = this.validDigest(
			req,
			req.headers.digest.replace('SHA-256=', '')
		);

		if (!digestValid) {
			logger.error('ap', 'digest invalid');
			return {
				valid: false
			};
		} else {
			logger.debug('ap', 'digest valid');
		}

		let actor = await ApActorService.get(JSON.parse(req.body).actor);

		if (!actor) {
			logger.debug('ap', 'actor not properly fetched');

			// actor not present, so there's nothing to delete
			if (type === "Delete") return {
				valid: false,
				pretendToProcess: true
			};
			
			return {
				valid: false
			};
		} else if (actor.suspended) {
			return {
				valid: false,
				pretendToProcess: true
			};
		} else if (!actor.activated) {
			return {
				valid: false,
				pretendToProcess: true
			};
		} else {
			let parsedRequest = await httpSignature.parseRequest(req, {
				headers: ['(request-target)', 'digest', 'host', 'date']
			});

			let signatureValid = httpSignature.verifySignature(
				parsedRequest,
				actor.publicKey
			);

			if (signatureValid) {
				logger.debug('ap', 'signature verified');
				return {
					valid: true
				};
			} else {
				logger.error('ap', 'signature verification failed');
				return {
					valid: false
				};
			}
		}
	}

	public validDigest(req, digest): boolean {
		return (
			crypto.createHash('sha256').update(req.body).digest('base64') ===
			digest
		);
	}

	public validBody(body): boolean {
		if (!body) return false;
		if (!body.type) return false;

		logger.debug(
			'validation',
			'ap object type is valid (' + body.type + ')'
		);

		return true;
	}
}

export default new ApValidationService();
