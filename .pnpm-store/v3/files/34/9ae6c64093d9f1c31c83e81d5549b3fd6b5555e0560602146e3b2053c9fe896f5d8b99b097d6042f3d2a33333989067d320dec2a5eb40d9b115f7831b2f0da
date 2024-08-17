"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisStatsHandler = void 0;
const redis_info_1 = require("redis-info");
function formatUptime(uptime) {
    const date = new Date(uptime * 1000);
    const days = date.getUTCDate() - 1, hours = date.getUTCHours(), minutes = date.getUTCMinutes(), seconds = date.getUTCSeconds();
    // Initialize an array for the uptime.
    const segments = [];
    // Format the uptime string.
    if (days > 0)
        segments.push(days + ' day' + (days == 1 ? '' : 's'));
    if (hours > 0)
        segments.push(hours + ' hour' + (hours == 1 ? '' : 's'));
    if (minutes > 0)
        segments.push(minutes + ' minute' + (minutes == 1 ? '' : 's'));
    if (seconds > 0 && days === 0)
        segments.push(seconds + ' second' + (seconds == 1 ? '' : 's'));
    return segments.join(', ');
}
async function getStats(queue) {
    const redisInfoRaw = await queue.getRedisInfo();
    const redisInfo = (0, redis_info_1.parse)(redisInfoRaw);
    return {
        version: redisInfo.redis_version,
        mode: redisInfo.redis_mode,
        port: +redisInfo.tcp_port,
        os: redisInfo.os,
        uptime: formatUptime(+redisInfo.uptime_in_seconds),
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