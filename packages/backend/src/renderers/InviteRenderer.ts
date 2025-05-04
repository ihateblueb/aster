import { ObjectLiteral } from 'typeorm';

import UserRenderer from './UserRenderer.js';

class InviteRenderer {
	public async render(invite: ObjectLiteral) {
		if (invite.creator)
			invite.creator = await UserRenderer.render(invite.creator);

		if (invite.user)
			invite.creator = await UserRenderer.render(invite.user);

		return invite;
	}

	public async renderMany(invites: ObjectLiteral[]) {
		let rendered: ObjectLiteral[] = [];

		for (const invite of invites) {
			await this.render(invite).then((e) => {
				if (e) rendered.push(e);
			});
		}

		return rendered;
	}
}

export default new InviteRenderer();
