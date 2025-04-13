type UnitOfTime = number;

class TimeService {
	public second: UnitOfTime = 1000;
	public minute: UnitOfTime = 60 * this.second;
	public hour: UnitOfTime = 60 * this.minute;
	public day: UnitOfTime = 24 * this.hour;
	public week: UnitOfTime = 7 * this.day;

	public isTimeAgo(time: Date, distance: UnitOfTime): boolean {
		const sinceEpoch = Date.now() - time.getTime();
		return Boolean(sinceEpoch >= distance);
	}
}

export default new TimeService();
