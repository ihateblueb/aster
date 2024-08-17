"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisStatsHandler = void 0;
const redis_info_1 = require("redis-info");
async function getStats(queue) {
    const redisInfoRaw = await queue.getRedisInfo();
    const redisInfo = (0, redis_info_1.parse)(redisInfoRaw);
    return {
        version: redisInfo.redis_version,
        mode: redisInfo.redis_mode,
        port: +redisInfo.tcp_port,
        os: redisInfo.os,
        uptime: +redisInfo.uptime_in_seconds,
        memory: {
            total: +redisInfo.total_system_memory || +redisInfo.maxmemory,
            used: +redisInfo.used_memory,
            fragmentationRatio: +redisInfo.mem_fragmentation_ratio,
            peak: +redisInfo.used_memory_peak,
        },
        clients: {
            connected: +redisInfo.connected_clients,
            blocked: +redisInfo.blocked_clients,
        },
    };
}
async function redisStatsHandler({ queues: bullBoardQueues, }) {
    const pairs = [...bullBoardQueues.values()];
    const body = pairs.length > 0 ? await getStats(pairs[0]) : {};
    return {
        body,
    };
}
exports.redisStatsHandler = redisStatsHandler;
//# sourceMappingURL=redisStats.js.map