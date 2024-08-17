"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobProvider = void 0;
function jobProvider(next) {
    return async (req, queue) => {
        const { jobId } = req.params;
        const job = await queue.getJob(jobId);
        if (!job) {
            return {
                status: 404,
                body: {
                    error: 'Job not found',
                },
            };
        }
        return next(req, job, queue);
    };
}
exports.jobProvider = jobProvider;
//# sourceMappingURL=job.js.map