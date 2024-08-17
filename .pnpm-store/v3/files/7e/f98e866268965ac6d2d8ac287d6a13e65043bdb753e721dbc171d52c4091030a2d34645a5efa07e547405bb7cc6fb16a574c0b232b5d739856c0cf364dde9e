"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resumeQueueHandler = void 0;
const queue_1 = require("../providers/queue");
async function resumeQueue(_req, queue) {
    await queue.resume();
    return { status: 200, body: {} };
}
exports.resumeQueueHandler = (0, queue_1.queueProvider)(resumeQueue);
//# sourceMappingURL=resumeQueue.js.map