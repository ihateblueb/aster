import { ObjectLiteral } from 'typeorm';

import NoteRenderer from '../renderers/NoteRenderer.js';
import NotificationRenderer from '../renderers/NotificationRenderer.js';
import DriveService from './DriveService.js';
import NoteService from './NoteService.js';
import NotificationService from './NotificationService.js';
import RelationshipService from './RelationshipService.js';
import ReportService from './ReportService.js';

class TimelineService {
	public async get(
		type: string,
		where: where,
		take: number,
		order: string,
		orderDirection: 'ASC' | 'DESC',
		orWhere?: where,
		andWhere?: where
	) {
		let timelineObjects;

		if (type === 'note')
			timelineObjects = await NoteRenderer.renderMany(
				await NoteService.getMany(
					where,
					take,
					order,
					orderDirection,
					orWhere,
					andWhere
				)
			);
		if (type === 'notification')
			timelineObjects = await NotificationRenderer.renderMany(
				await NotificationService.getMany(
					where,
					take,
					order,
					orderDirection,
					orWhere,
					andWhere
				)
			);
		if (type === 'report')
			timelineObjects = await ReportService.getMany(
				where,
				take,
				order,
				orderDirection,
				orWhere,
				andWhere
			);
		if (type === 'drive')
			timelineObjects = await DriveService.getMany(
				where,
				take,
				order,
				orderDirection,
				orWhere,
				andWhere
			);
		if (type === 'relationship')
			timelineObjects = await RelationshipService.getMany(
				where,
				take,
				order,
				orderDirection
			);

		return this.sort(timelineObjects, take);
	}

	public sort(timeline: ObjectLiteral[], take: number) {
		timeline.sort(
			(x, y) =>
				Number(new Date(y.createdAt)) - Number(new Date(x.createdAt))
		);

		if (timeline.length > take) timeline.length = take;

		//if (timeline.length > 1) return undefined;

		return timeline;
	}
}

export default new TimelineService();
