"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueuesApi = void 0;
function getQueuesApi(queues) {
    const bullBoardQueues = new Map();
    function addQueue(queue) {
        const name = queue.getName();
        bullBoardQueues.set(name, queue);
    }
    function removeQueue(queueOrName) {
        const name = typeof queueOrName === 'string' ? queueOrName : queueOrName.getName();
        bullBoardQueues.delete(name);
    }
    function setQueues(newBullQueues) {
        newBullQueues.forEach((queue) => {
            const name = queue.getName();
            bullBoardQueues.set(name, queue);
        });
    }
    function replaceQueues(newBullQueues) {
        const queuesToPersist = newBullQueues.map((queue) => queue.getName());
        bullBoardQueues.forEach((_queue, name) => {
            if (queuesToPersist.indexOf(name) === -1) {
                bullBoardQueues.delete(name);
            }
        });
        return setQueues(newBullQueues);
    }
    setQueues(queues);
    return { bullBoardQueues, setQueues, replaceQueues, addQueue, removeQueue };
}
exports.getQueuesApi = getQueuesApi;
//# sourceMappingURL=queuesApi.js.map