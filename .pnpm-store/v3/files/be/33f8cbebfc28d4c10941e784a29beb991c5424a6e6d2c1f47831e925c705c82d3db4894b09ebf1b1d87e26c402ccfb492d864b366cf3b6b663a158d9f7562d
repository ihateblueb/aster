"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanAllHandler = void 0;
const queue_1 = require("../providers/queue");
async function cleanAll(req, queue) {
    const { queueStatus } = req.params;
    const GRACE_TIME_MS = 5000;
    await queue.clean(queueStatus, GRACE_TIME_MS);
    return {
        status: 200,
        body: {},
    };
}
exports.cleanAllHandler = (0, queue_1.queueProvider)(cleanAll);
//# sourceMappingURL=cleanAll.js.map