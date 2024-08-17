"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retryAllHandler = void 0;
const queue_1 = require("../providers/queue");
async function retryAll(req, queue) {
    const { queueStatus } = req.params;
    const jobs = await queue.getJobs([queueStatus]);
    await Promise.all(jobs.map((job) => job.retry(queueStatus)));
    return { status: 200, body: {} };
}
exports.retryAllHandler = (0, queue_1.queueProvider)(retryAll);
//# sourceMappingURL=retryAll.js.map