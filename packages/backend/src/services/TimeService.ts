type UnitOfTime = number;

class TimeService {
	public second = 1000;
	public minute = 60 * this.second;
	public hour = 60 * this.minute;
	public day = 24 * this.hour;
	public week = 7 * this.day;

	public isTimeAgo(time: Date, distance: UnitOfTime): boolean {
		const sinceEpoch = Date.now() - time.getTime();
		return Boolean(sinceEpoch >= distance);
	}
}

export default new TimeService();
