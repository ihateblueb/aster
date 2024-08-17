"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapAsync = void 0;
const wrapAsync = (fn) => async (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
exports.wrapAsync = wrapAsync;
//# sourceMappingURL=wrapAsync.js.map