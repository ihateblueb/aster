import logger from '../../utils/logger.js';
import config from '../../utils/config.js';

import crypto from 'crypto';
import httpSignature from '@peertube/http-signature';

import ApActorService from './ApActorService.js';

// #region Valid AP Types

let validApTypes = [
	/*
		Core Types
		https://www.w3.org/TR/activitystreams-vocabulary/#types

		Omitted:
		- IntransitiveActivity
		- CollectionPage
		- OrderedCollectionPage
	*/
	'Object',
	'Link',
	'Activity',
	'Collection',
	'OrderedCollection',

	/*
		Activity Types
		https://www.w3.org/TR/activitystreams-vocabulary/#activity-types

		Omitted:
		- Arrive
		- Ignore
		- Invite
		- Join
		- Leave
		- Listen
		- Offer
		- Read
		- TentativeAccept
		- TentativeReject
		- Travel
		- Read

		Added:
		- Bite (as defined in https://ns.mia.jetzt/as/#Bite)
		- EmojiReact (as defined in... somewhere) // TODO: get this
		- Mood (as defined in https://harper.eepy.zone/ns#Mood)
	*/
	'Accept',
	'Add',
	'Announce',
	'Bite',
	'Block',
	'Create',
	'Delete',
	'Dislike',
	'EmojiReact',
	'Flag',
	'Follow',
	'Like',
	'Mood',
	'Move',
	'Question',
	'Reject',
	'Read',
	'Remove',
	'Undo',
	'Update',

	/*
		Actor Types
		https://www.w3.org/TR/activitystreams-vocabulary/#actor-types

		Omitted:
		- Group
	*/
	'Application',
	'Organization',
	'Person',
	'Service',

	/*
		Object and Link Types
		https://www.w3.org/TR/activitystreams-vocabulary/#object-types

		// TODO: try converting some of these to notes
		Omitted:
		- Audio
		- Document
		- Event
		- Image
		- Page
		- Place
		- Profile
		- Relationship
		- Video

		Added:
		- WafrnHashtag (as defined in... somewhere) // TODO: poke gabbo
		- Emoji (toot:Emoji pretty sure)
	*/
	'Article',
	'Note',
	'Tombstone',

	// TODO: theres more for sure
	'Mention',
	'WafrnHashtag',
	'Emoji'
];

// #endregion

class ApValidationService {
	public isValidObject(body) {
		if (body.type) {
			logger.debug(
				'validation',
				'activity type present (' + body.type + ')'
			);

			if (!body['@context']) return false;

			if (validApTypes.includes(body.type)) {
				logger.debug(
					'validation',
					'ap object type is valid (' + body.type + ')'
				);

				// #region Specific Object Validation

				// #region Core Types
				// #endregion

				// #region Activity Types
				// #endregion

				// #region Actor Types
				if (body.type === 'Person' || body.type === 'Service') {
					if (!body.id) return false;
					if (!body.inbox) return false;
					if (!body.outbox) return false;
					if (!body.following) return false;
					if (!body.followers) return false;
					// TODO: spec does not require this, id fallback?
					if (!body.preferredUsername) return false;

					return true;
				}
				// #endregion

				// #region Object and Link Types
				// #endregion

				// #endregion
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

		let actor = await ApActorService.get(JSON.parse(req.body).actor);

		if (!actor) {
			logger.error('ap', 'actor not properly grabbed');
			return false;
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
