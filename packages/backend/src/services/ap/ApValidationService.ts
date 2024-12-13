import * as punycode from 'node:punycode';

import httpSignature from '@peertube/http-signature';
import crypto from 'crypto';

import config from '../../utils/config.js';
import db from '../../utils/database.js';
import logger from '../../utils/logger.js';
import ApActorService from './ApActorService.js';

class ApValidationService {
	public async validSignature(
		req,
		type?: string
	): Promise<{
		valid: boolean;
		pretendToProcess?: boolean;
		blocked?: boolean;
	}> {
		if (!req.headers.host) {
			logger.debug('ap', 'no host present');
			return {
				valid: false
			};
		}

		if (req.headers.host !== new URL(config.url).host) {
			logger.debug('ap', 'host header did not match configuration');
			return {
				valid: false
			};
		}

		if (!req.headers.digest) {
			logger.debug('ap', 'digest not present');
			return {
				valid: false
			};
		}

		if (!req.headers.digest.startsWith('SHA-256=')) {
			logger.debug('ap', 'digest did not start with SHA-256=');
			return {
				valid: false
			};
		}

		if (!req.headers.signature) {
			logger.debug('ap', 'signature header not present');
			return {
				valid: false
			};
		}

		const digestValid = this.validDigest(
			req,
			req.headers.digest.replace('SHA-256=', '')
		);

		if (!digestValid) {
			logger.debug('ap', 'digest invalid');
			return {
				valid: false
			};
		}

		const parsedRequest = await httpSignature.parseRequest(req, {
			headers: ['(request-target)', 'digest', 'host', 'date']
		});

		if (!parsedRequest.keyId) {
			logger.debug('ap', 'parsed request did not have keyId');
			return { valid: false };
		}

		const actorApId = new URL(
			parsedRequest.keyId.replace(new URL(parsedRequest.keyId).hash, '')
		);
		if (!actorApId)
			return {
				valid: false
			};

		const moderatedInstance = await db
			.getRepository('moderated_instance')
			.findOne({
				where: {
					host: punycode.toASCII(actorApId.host)
				}
			});

		if (moderatedInstance) {
			if (req.method === 'POST' && !moderatedInstance.accept) {
				logger.info(
					'ap',
					'blocked activity from ' + new URL(actorApId).host
				);
				return {
					valid: false,
					blocked: true
				};
			} else if (req.method === 'GET' && !moderatedInstance.return) {
				logger.info(
					'ap',
					'blocked fetch from ' + new URL(actorApId).host
				);
				return {
					valid: false,
					blocked: true
				};
			}
		}

		const actor = await ApActorService.get(actorApId.toString());

		if (!actor) {
			if (type === 'Delete') {
				logger.debug(
					'ap',
					"actor not known, so there's nothing to delete. pretending to process"
				);

				return {
					valid: false,
					pretendToProcess: true
				};
			} else {
				logger.debug('ap', 'actor not properly fetched');

				return {
					valid: false
				};
			}
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
			const signatureValid = httpSignature.verifySignature(
				parsedRequest,
				actor.publicKey
			);

			if (signatureValid) {
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
		if (!body.id) return false;
		if (!body.type) return false;

		logger.debug(
			'validation',
			'ap object type is valid (' + body.type + ')'
		);

		return true;
	}
}

export default new ApValidationService();
