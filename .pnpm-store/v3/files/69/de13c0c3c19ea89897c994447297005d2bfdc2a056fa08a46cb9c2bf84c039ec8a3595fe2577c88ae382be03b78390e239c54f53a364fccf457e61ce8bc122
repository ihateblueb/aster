"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanJobHandler = void 0;
const job_1 = require("../providers/job");
const queue_1 = require("../providers/queue");
async function cleanJob(_req, job) {
    await job.remove();
    return {
        status: 204,
        body: {},
    };
}
exports.cleanJobHandler = (0, queue_1.queueProvider)((0, job_1.jobProvider)(cleanJob));
//# sourceMappingURL=cleanJob.js.map