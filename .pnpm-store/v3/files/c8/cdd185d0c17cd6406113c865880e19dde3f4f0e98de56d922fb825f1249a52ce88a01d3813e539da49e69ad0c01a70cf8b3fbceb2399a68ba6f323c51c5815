"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entryPoint = void 0;
function entryPoint(params) {
    var _a, _b;
    const basePath = params.basePath.endsWith('/') ? params.basePath : `${params.basePath}/`;
    const uiConfig = JSON.stringify(params.uiConfig)
        .replace(/</g, '\\u003c')
        .replace(/>/g, '\\u003e');
    return {
        name: 'index.ejs',
        params: {
            basePath,
            uiConfig,
            title: params.uiConfig.boardTitle,
            favIconDefault: (_a = params.uiConfig.favIcon) === null || _a === void 0 ? void 0 : _a.default,
            favIconAlternative: (_b = params.uiConfig.favIcon) === null || _b === void 0 ? void 0 : _b.alternative,
        },
    };
}
exports.entryPoint = entryPoint;
//# sourceMappingURL=entryPoint.js.map