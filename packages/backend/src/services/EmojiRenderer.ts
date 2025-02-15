import { ObjectLiteral } from 'typeorm';

class EmojiRenderer {
	public async categorize(data: ObjectLiteral[]) {
		let categorized: ObjectLiteral = {};

		for (const emoji of data) {
			if (!Object.keys(categorized).includes(emoji.category ?? 'other'))
				categorized[emoji.category ?? 'other'] = [];
			categorized[emoji.category ?? 'other'].push(emoji);
		}

		return categorized;
	}
}

export default new EmojiRenderer();
