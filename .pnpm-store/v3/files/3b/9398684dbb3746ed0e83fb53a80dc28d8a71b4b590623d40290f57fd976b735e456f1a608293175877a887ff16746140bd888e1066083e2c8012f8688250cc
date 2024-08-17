"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler(error) {
    return {
        status: 500,
        body: {
            error: 'Internal server error',
            message: error.message,
            details: error.stack,
        },
    };
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.js.map