"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retryJobHandler = void 0;
const job_1 = require("../providers/job");
const queue_1 = require("../providers/queue");
async function retryJob(req, job) {
    const { queueStatus } = req.params;
    await job.retry(queueStatus);
    return {
        status: 204,
        body: {},
    };
}
exports.retryJobHandler = (0, queue_1.queueProvider)((0, job_1.jobProvider)(retryJob));
//# sourceMappingURL=retryJob.js.map