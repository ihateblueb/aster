"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promoteAllHandler = void 0;
const queue_1 = require("../providers/queue");
async function promoteAll(_req, queue) {
    await queue.promoteAll();
    return { status: 200, body: {} };
}
exports.promoteAllHandler = (0, queue_1.queueProvider)(promoteAll);
//# sourceMappingURL=promoteAll.js.map