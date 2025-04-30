import { ObjectLiteral } from 'typeorm';

import context from '../../../static/context.js';
import ConfigService from '../../ConfigService.js';
import ApEmojiRenderer from './ApEmojiRenderer.js';

class EmojiReactRenderer {
	public render(
		id: GenericId,
		actor: GenericId,
		object: ApId,
		emoji?: ObjectLiteral,
		content?: string
	): ApObject {
		let apEmojiReact = {
			'@context': context,

			'type': 'EmojiReact',
			'id': id,
			'actor': ConfigService.url.href + 'users/' + actor,
			'object': object,
			'content': emoji ? emoji.shortcode : content
		};

		if (emoji)
			apEmojiReact['tag'] = [
				ApEmojiRenderer.render(
					emoji.id,
					emoji.shortcode,
					emoji.file.src
				)
			];

		return apEmojiReact;
	}
}

export default new EmojiReactRenderer();
