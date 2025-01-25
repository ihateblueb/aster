import httpSignature from '@peertube/http-signature';
import crypto from 'crypto';
import { FastifyRequest } from 'fastify';

import logger from '../../utils/logger.js';
import ConfigService from '../ConfigService.js';
import ModeratedInstanceService from '../ModeratedInstanceService.js';
import ValidationService from '../ValidationService.js';
import ApActorService from './ApActorService.js';

class ApValidationService {
	public async validSignature(
		req: FastifyRequest,
		type?: string
	): Promise<{
		valid: boolean;
		pretendToProcess?: boolean;
		blocked?: boolean;
		user?: string;
	}> {
		if (!req.headers.host) {
			logger.debug('ap', 'no host present');
			return {
				valid: false
			};
		}

		if (req.headers.host !== ConfigService.url.host) {
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

		try {
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
		} catch {
			logger.debug('ap', 'failed to validate digest');
			return {
				valid: false
			};
		}

		const parsedRequest = await httpSignature.parseRequest(req, {
			headers: ['(request-target)', 'digest', 'host', 'date']
		});

		if (!parsedRequest && !parsedRequest.keyId) {
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

		if (
			req.method === 'POST' &&
			!(await ModeratedInstanceService.allowAccept(actorApId.host))
		) {
			logger.info(
				'ap',
				'blocked activity from ' + new URL(actorApId).host
			);
			return {
				valid: false,
				blocked: true
			};
		} else if (
			req.method === 'GET' &&
			!(await ModeratedInstanceService.allowReturn(actorApId.host))
		) {
			logger.info('ap', 'blocked fetch from ' + new URL(actorApId).host);
			return {
				valid: false,
				blocked: true
			};
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
				pretendToProcess: true,
				user: actor.id
			};
		} else if (!actor.activated) {
			return {
				valid: false,
				pretendToProcess: true,
				user: actor.id
			};
		} else {
			const signatureValid = httpSignature.verifySignature(
				parsedRequest,
				actor.publicKey
			);

			if (signatureValid) {
				return {
					valid: true,
					user: actor.id
				};
			} else {
				logger.error('ap', 'signature verification failed');
				return {
					valid: false,
					user: actor.id
				};
			}
		}
	}

	public validDigest(req, digest): boolean {
		return (
			crypto
				.createHash('sha256')
				.update(JSON.stringify(req.body))
				.digest('base64') === digest
		);
	}

	public validBody(body): boolean {
		if (!body) return false;
		if (!body.id) return false;
		if (!ValidationService.validUrl(body.id)) return false;
		if (!body.type) return false;

		logger.debug('validation', 'ap object type is ' + body.type);

		return true;
	}
}

export default new ApValidationService();
