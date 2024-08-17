"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBullBoard = void 0;
const path_1 = __importDefault(require("path"));
const error_1 = require("./handlers/error");
const queuesApi_1 = require("./queuesApi");
const routes_1 = require("./routes");
function createBullBoard({ queues, serverAdapter, options = { uiConfig: {} }, }) {
    const { bullBoardQueues, setQueues, replaceQueues, addQueue, removeQueue } = (0, queuesApi_1.getQueuesApi)(queues);
    const uiBasePath = options.uiBasePath || path_1.default.dirname(eval(`require.resolve('@bull-board/ui/package.json')`));
    serverAdapter
        .setQueues(bullBoardQueues)
        .setViewsPath(path_1.default.join(uiBasePath, 'dist'))
        .setStaticPath('/static', path_1.default.join(uiBasePath, 'dist/static'))
        .setUIConfig({
        boardTitle: 'Bull Dashboard',
        favIcon: {
            default: 'static/images/logo.svg',
            alternative: 'static/favicon-32x32.png',
        },
        ...options.uiConfig,
    })
        .setEntryRoute(routes_1.appRoutes.entryPoint)
        .setErrorHandler(error_1.errorHandler)
        .setApiRoutes(routes_1.appRoutes.api);
    return { setQueues, replaceQueues, addQueue, removeQueue };
}
exports.createBullBoard = createBullBoard;
//# sourceMappingURL=index.js.map