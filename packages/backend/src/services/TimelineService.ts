import NoteService from './NoteService.js';

class TimelineService {
	public async get(
		type: string,
		where: any,
		take: number,
		order: string,
		orderDirection: 'ASC' | 'DESC'
	) {
		let timelineObjects;

		if (type === 'note')
			timelineObjects = await NoteService.getMany(
				where,
				take,
				order,
				orderDirection
			);

		return await this.sort(timelineObjects, take);
	}

	public async sort(timeline: any[], take: number) {
		timeline.sort(
			(x, y) => +new Date(y.createdAt) - +new Date(x.createdAt)
		);

		if (timeline.length > take) {
			timeline.length = take;
		}

		return timeline;
	}
}

export default new TimelineService();
