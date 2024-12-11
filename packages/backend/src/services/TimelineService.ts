import { ObjectLiteral } from 'typeorm';

import NoteService from './NoteService.js';
import NotificationService from './NotificationService.js';

class TimelineService {
	public async get(
		type: string,
		where: where,
		take: number,
		order: string,
		orderDirection: 'ASC' | 'DESC',
		orWhere?: where
	) {
		let timelineObjects;

		if (type === 'note')
			timelineObjects = await NoteService.getMany(
				where,
				take,
				order,
				orderDirection,
				orWhere
			);
		if (type === 'notification')
			timelineObjects = await NotificationService.getMany(
				where,
				take,
				order,
				orderDirection,
				orWhere
			);

		return this.sort(timelineObjects, take);
	}

	public sort(timeline: ObjectLiteral[], take: number) {
		timeline.sort(
			(x, y) => +new Date(y.createdAt) - +new Date(x.createdAt)
		);

		if (timeline.length > take) {
			timeline.length = take;
		}

		//if (timeline.length > 1) return undefined;

		return timeline;
	}
}

export default new TimelineService();
