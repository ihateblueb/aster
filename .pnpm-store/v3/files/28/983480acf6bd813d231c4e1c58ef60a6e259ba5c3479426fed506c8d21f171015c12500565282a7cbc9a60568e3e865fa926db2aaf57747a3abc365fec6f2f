"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BullMQAdapter = void 0;
const statuses_1 = require("../constants/statuses");
const base_1 = require("./base");
class BullMQAdapter extends base_1.BaseAdapter {
    constructor(queue, options = {}) {
        super('bullmq', options);
        this.queue = queue;
    }
    async getRedisInfo() {
        const client = await this.queue.client;
        return client.info();
    }
    getName() {
        return `${this.prefix}${this.queue.name}`;
    }
    async clean(jobStatus, graceTimeMs) {
        await this.queue.clean(graceTimeMs, 1000, jobStatus);
    }
    addJob(name, data, options) {
        return this.queue.add(name, data, options);
    }
    getJob(id) {
        return this.queue.getJob(id);
    }
    getJobs(jobStatuses, start, end) {
        return this.queue.getJobs(jobStatuses, start, end);
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
        return this.queue.drain();
    }
    async promoteAll() {
        // since bullmq 4.6.0
        if (typeof this.queue.promoteJobs === 'function') {
            await this.queue.promoteJobs();
        }
        else {
            const jobs = await this.getJobs([statuses_1.STATUSES.delayed]);
            await Promise.all(jobs.map((job) => job.promote()));
        }
    }
    getStatuses() {
        return [
            statuses_1.STATUSES.latest,
            statuses_1.STATUSES.active,
            statuses_1.STATUSES.waiting,
            statuses_1.STATUSES.waitingChildren,
            statuses_1.STATUSES.prioritized,
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
            statuses_1.STATUSES.waitingChildren,
            statuses_1.STATUSES.prioritized,
            statuses_1.STATUSES.completed,
            statuses_1.STATUSES.failed,
            statuses_1.STATUSES.delayed,
            statuses_1.STATUSES.paused,
        ];
    }
}
exports.BullMQAdapter = BullMQAdapter;
//# sourceMappingURL=bullMQ.js.map