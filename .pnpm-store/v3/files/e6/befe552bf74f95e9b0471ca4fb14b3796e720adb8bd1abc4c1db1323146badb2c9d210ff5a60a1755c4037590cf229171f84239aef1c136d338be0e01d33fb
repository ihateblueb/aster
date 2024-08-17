"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pauseQueueHandler = void 0;
const queue_1 = require("../providers/queue");
async function pauseQueue(_req, queue) {
    await queue.pause();
    return { status: 200, body: {} };
}
exports.pauseQueueHandler = (0, queue_1.queueProvider)(pauseQueue);
//# sourceMappingURL=pauseQueue.js.map