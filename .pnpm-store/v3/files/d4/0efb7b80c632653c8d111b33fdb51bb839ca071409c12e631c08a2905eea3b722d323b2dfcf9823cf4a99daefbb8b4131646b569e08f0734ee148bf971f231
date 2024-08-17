"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressAdapter = void 0;
const ejs_1 = __importDefault(require("ejs"));
const express_1 = __importStar(require("express"));
const wrapAsync_1 = require("./helpers/wrapAsync");
class ExpressAdapter {
    constructor() {
        this.basePath = '';
        this.uiConfig = {};
        this.app = (0, express_1.default)();
    }
    setBasePath(path) {
        this.basePath = path;
        return this;
    }
    setStaticPath(staticsRoute, staticsPath) {
        this.app.use(staticsRoute, express_1.default.static(staticsPath));
        return this;
    }
    setViewsPath(viewPath) {
        this.app.set('view engine', 'ejs').set('views', viewPath);
        this.app.engine('ejs', ejs_1.default.renderFile);
        return this;
    }
    setErrorHandler(handler) {
        this.errorHandler = handler;
        return this;
    }
    setApiRoutes(routes) {
        if (!this.errorHandler) {
            throw new Error(`Please call 'setErrorHandler' before using 'registerPlugin'`);
        }
        else if (!this.bullBoardQueues) {
            throw new Error(`Please call 'setQueues' before using 'registerPlugin'`);
        }
        const router = (0, express_1.Router)();
        router.use(express_1.default.json());
        routes.forEach((route) => (Array.isArray(route.method) ? route.method : [route.method]).forEach((method) => {
            router[method](route.route, (0, wrapAsync_1.wrapAsync)(async (req, res) => {
                const response = await route.handler({
                    queues: this.bullBoardQueues,
                    query: req.query,
                    params: req.params,
                    body: req.body,
                });
                res.status(response.status || 200).json(response.body);
            }));
        }));
        router.use((err, _req, res, next) => {
            if (!this.errorHandler) {
                return next();
            }
            const response = this.errorHandler(err);
            return res.status(response.status).send(response.body);
        });
        this.app.use(router);
        return this;
    }
    setEntryRoute(routeDef) {
        const viewHandler = (_req, res) => {
            const { name, params } = routeDef.handler({
                basePath: this.basePath,
                uiConfig: this.uiConfig,
            });
            res.render(name, params);
        };
        this.app[routeDef.method](routeDef.route, viewHandler);
        return this;
    }
    setQueues(bullBoardQueues) {
        this.bullBoardQueues = bullBoardQueues;
        return this;
    }
    setUIConfig(config = {}) {
        this.uiConfig = config;
        return this;
    }
    getRouter() {
        return this.app;
    }
}
exports.ExpressAdapter = ExpressAdapter;
//# sourceMappingURL=ExpressAdapter.js.map