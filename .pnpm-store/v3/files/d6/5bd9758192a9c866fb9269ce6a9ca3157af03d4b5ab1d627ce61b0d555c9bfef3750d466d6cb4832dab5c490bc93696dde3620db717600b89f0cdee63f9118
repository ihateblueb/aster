"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeDelay = void 0;
const content = `--[[
  Change job delay when it is in delayed set.
  Input:
    KEYS[1] delayed key
    KEYS[2] meta key
    KEYS[3] marker key
    KEYS[4] events stream
    ARGV[1] delay
    ARGV[2] delayedTimestamp
    ARGV[3] the id of the job
    ARGV[4] job key
  Output:
    0 - OK
   -1 - Missing job.
   -3 - Job not in delayed set.
  Events:
    - delayed key.
]]
local rcall = redis.call
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if (nextTimestamp ~= nil) then 
      nextTimestamp = nextTimestamp / 0x1000
    end
    return nextTimestamp
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
    local nextTimestamp = getNextDelayedTimestamp(delayedKey)
    if nextTimestamp ~= nil then
        -- Replace the score of the marker with the newest known
        -- next timestamp.
        rcall("ZADD", markerKey, nextTimestamp, "1")
    end
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
    local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
    if not maxEvents then
        maxEvents = 10000
        rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
    end
    return maxEvents
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePaused(queueMetaKey)
    return rcall("HEXISTS", queueMetaKey, "paused") == 1
end
if rcall("EXISTS", ARGV[4]) == 1 then
  local jobId = ARGV[3]
  local score = tonumber(ARGV[2])
  local delayedTimestamp = (score / 0x1000)
  local numRemovedElements = rcall("ZREM", KEYS[1], jobId)
  if numRemovedElements < 1 then
    return -3
  end
  rcall("HSET", ARGV[4], "delay", tonumber(ARGV[1]))
  rcall("ZADD", KEYS[1], score, jobId)
  local maxEvents = getOrSetMaxEvents(KEYS[2])
  rcall("XADD", KEYS[4], "MAXLEN", "~", maxEvents, "*", "event", "delayed",
    "jobId", jobId, "delay", delayedTimestamp)
  -- mark that a delayed job is available
  local isPaused = isQueuePaused(KEYS[2])
  if not isPaused then
    addDelayMarkerIfNeeded(KEYS[3], KEYS[1])
  end
  return 0
else
  return -1
end`;
exports.changeDelay = {
    name: 'changeDelay',
    content,
    keys: 4,
};
//# sourceMappingURL=changeDelay-4.js.map