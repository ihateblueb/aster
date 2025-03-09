import { ObjectLiteral } from 'typeorm';

import NoteRenderer from './NoteRenderer.js';
import UserRenderer from './UserRenderer.js';

class NotificationRenderer {
	public async render(notification: ObjectLiteral) {
		notification.to = await UserRenderer.render(notification.to);
		if (notification.from)
			notification.from = await UserRenderer.render(notification.from);

		if (notification.note)
			notification.note = await NoteRenderer.render(notification.note);

		return notification;
	}

	public async renderMany(notifications: ObjectLiteral[]) {
		let rendered: ObjectLiteral[] = [];

		for (const notification of notifications) {
			await this.render(notification).then((e) => {
				if (e) rendered.push(e);
			});
		}

		return rendered;
	}
}

export default new NotificationRenderer();
