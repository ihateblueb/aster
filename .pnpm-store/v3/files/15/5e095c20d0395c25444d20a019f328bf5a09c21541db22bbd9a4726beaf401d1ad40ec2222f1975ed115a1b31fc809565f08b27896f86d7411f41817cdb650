"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobLogsHandler = void 0;
const queue_1 = require("../providers/queue");
async function jobLogs(req, queue) {
    const { jobId } = req.params;
    const logs = await queue.getJobLogs(jobId);
    return {
        status: 200,
        body: logs,
    };
}
exports.jobLogsHandler = (0, queue_1.queueProvider)(jobLogs, {
    skipReadOnlyModeCheck: true,
});
//# sourceMappingURL=jobLogs.js.map