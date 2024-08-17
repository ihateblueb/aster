"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyQueueHandler = void 0;
const queue_1 = require("../providers/queue");
async function emptyQueue(_req, queue) {
    await queue.empty();
    return { status: 200, body: {} };
}
exports.emptyQueueHandler = (0, queue_1.queueProvider)(emptyQueue);
//# sourceMappingURL=emptyQueue.js.map