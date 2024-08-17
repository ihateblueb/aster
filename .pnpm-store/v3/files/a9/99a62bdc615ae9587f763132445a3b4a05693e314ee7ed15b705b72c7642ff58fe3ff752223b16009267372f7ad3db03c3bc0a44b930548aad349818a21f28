"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BullAdapter = void 0;
const statuses_1 = require("../constants/statuses");
const base_1 = require("./base");
class BullAdapter extends base_1.BaseAdapter {
    constructor(queue, options = {}) {
        super('bull', { ...options, allowCompletedRetries: false });
        this.queue = queue;
    }
    getRedisInfo() {
        return this.queue.client.info();
    }
    getName() {
        return `${this.prefix}${this.queue.name}`;
    }
    clean(jobStatus, graceTimeMs) {
        return this.queue.clean(graceTimeMs, jobStatus);
    }
    addJob(name, data, options) {
        return this.queue.add(name, data, options);
    }
    getJob(id) {
        return this.queue.getJob(id).then((job) => job && this.alignJobData(job));
    }
    getJobs(jobStatuses, start, end) {
        return this.queue.getJobs(jobStatuses, start, end).then((jobs) => jobs.map(this.alignJobData));
    }
    getJobCounts() {
        return this.queue.getJobCounts();
    }
    getJobLogs(id) {
        return this.queue.getJobLogs(id).then(({ logs }) => logs);
    }
    isPaused() {
        return this.queue.isPaused();
    }
    pause() {
        return this.queue.pause();
    }
    resume() {
        return this.queue.resume();
    }
    empty() {
        return this.queue.empty();
    }
    async promoteAll() {
        const jobs = await this.getJobs([statuses_1.STATUSES.delayed]);
        await Promise.all(jobs.map((job) => job.promote()));
    }
    getStatuses() {
        return [
            statuses_1.STATUSES.latest,
            statuses_1.STATUSES.active,
            statuses_1.STATUSES.waiting,
            statuses_1.STATUSES.completed,
            statuses_1.STATUSES.failed,
            statuses_1.STATUSES.delayed,
            statuses_1.STATUSES.paused,
        ];
    }
    getJobStatuses() {
        return [
            statuses_1.STATUSES.active,
            statuses_1.STATUSES.waiting,
            statuses_1.STATUSES.completed,
            statuses_1.STATUSES.failed,
            statuses_1.STATUSES.delayed,
            statuses_1.STATUSES.paused,
        ];
    }
    alignJobData(job) {
        if (typeof (job === null || job === void 0 ? void 0 : job.attemptsMade) === 'number') {
            job.attemptsMade++;
        }
        return job;
    }
}
exports.BullAdapter = BullAdapter;
//# sourceMappingURL=bull.js.map