"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueProvider = void 0;
function queueProvider(next, { skipReadOnlyModeCheck = false, } = {}) {
    return async (req) => {
        const { queueName } = req.params;
        const queue = req.queues.get(queueName);
        if (!queue) {
            return { status: 404, body: { error: 'Queue not found' } };
        }
        else if (queue.readOnlyMode && !skipReadOnlyModeCheck) {
            return {
                status: 405,
                body: { error: 'Method not allowed on read only queue' },
            };
        }
        return next(req, queue);
    };
}
exports.queueProvider = queueProvider;
//# sourceMappingURL=queue.js.map