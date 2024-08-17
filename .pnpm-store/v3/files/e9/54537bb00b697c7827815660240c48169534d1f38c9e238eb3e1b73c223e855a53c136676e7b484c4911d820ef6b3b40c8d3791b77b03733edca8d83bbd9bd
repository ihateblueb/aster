"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addJobHandler = void 0;
const queue_1 = require("../providers/queue");
const queues_1 = require("./queues");
async function addJob(req, queue) {
    const { name, data, options } = req.body;
    const job = await queue.addJob(name, data, options);
    return {
        status: 200,
        body: {
            job: (0, queues_1.formatJob)(job, queue),
            status: job.getState(),
        },
    };
}
exports.addJobHandler = (0, queue_1.queueProvider)(addJob);
//# sourceMappingURL=addJob.js.map