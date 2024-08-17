"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRoutes = void 0;
const addJob_1 = require("./handlers/addJob");
const cleanAll_1 = require("./handlers/cleanAll");
const cleanJob_1 = require("./handlers/cleanJob");
const emptyQueue_1 = require("./handlers/emptyQueue");
const entryPoint_1 = require("./handlers/entryPoint");
const jobLogs_1 = require("./handlers/jobLogs");
const job_1 = require("./handlers/job");
const pauseQueue_1 = require("./handlers/pauseQueue");
const promotJob_1 = require("./handlers/promotJob");
const queues_1 = require("./handlers/queues");
const redisStats_1 = require("./handlers/redisStats");
const resumeQueue_1 = require("./handlers/resumeQueue");
const retryAll_1 = require("./handlers/retryAll");
const retryJob_1 = require("./handlers/retryJob");
const promoteAll_1 = require("./handlers/promoteAll");
exports.appRoutes = {
    entryPoint: {
        method: 'get',
        route: ['/', '/queue/:queueName', '/queue/:queueName/:jobId'],
        handler: entryPoint_1.entryPoint,
    },
    api: [
        { method: 'get', route: '/api/redis/stats', handler: redisStats_1.redisStatsHandler },
        { method: 'get', route: '/api/queues', handler: queues_1.queuesHandler },
        {
            method: 'get',
            route: '/api/queues/:queueName/:jobId/logs',
            handler: jobLogs_1.jobLogsHandler,
        },
        {
            method: 'get',
            route: '/api/queues/:queueName/:jobId',
            handler: job_1.jobHandler,
        },
        {
            method: 'post',
            route: '/api/queues/:queueName/add',
            handler: addJob_1.addJobHandler,
        },
        {
            method: 'put',
            route: '/api/queues/:queueName/retry/:queueStatus',
            handler: retryAll_1.retryAllHandler,
        },
        {
            method: 'put',
            route: '/api/queues/:queueName/promote',
            handler: promoteAll_1.promoteAllHandler,
        },
        {
            method: 'put',
            route: '/api/queues/:queueName/clean/:queueStatus',
            handler: cleanAll_1.cleanAllHandler,
        },
        {
            method: 'put',
            route: '/api/queues/:queueName/pause',
            handler: pauseQueue_1.pauseQueueHandler,
        },
        {
            method: 'put',
            route: '/api/queues/:queueName/resume',
            handler: resumeQueue_1.resumeQueueHandler,
        },
        {
            method: 'put',
            route: '/api/queues/:queueName/empty',
            handler: emptyQueue_1.emptyQueueHandler,
        },
        {
            method: 'put',
            route: '/api/queues/:queueName/:jobId/retry/:queueStatus',
            handler: retryJob_1.retryJobHandler,
        },
        {
            method: 'put',
            route: '/api/queues/:queueName/:jobId/clean',
            handler: cleanJob_1.cleanJobHandler,
        },
        {
            method: 'put',
            route: '/api/queues/:queueName/:jobId/promote',
            handler: promotJob_1.promoteJobHandler,
        },
    ],
};
//# sourceMappingURL=routes.js.map