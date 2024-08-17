"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobHandler = void 0;
const queue_1 = require("../providers/queue");
const job_1 = require("../providers/job");
const queues_1 = require("./queues");
async function getJobState(_req, job, queue) {
    const status = await job.getState();
    return {
        status: 200,
        body: {
            job: (0, queues_1.formatJob)(job, queue),
            status,
        },
    };
}
exports.jobHandler = (0, queue_1.queueProvider)((0, job_1.jobProvider)(getJobState), {
    skipReadOnlyModeCheck: true,
});
//# sourceMappingURL=job.js.map