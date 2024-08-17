"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputCanceledError = void 0;
const readline_1 = __importDefault(require("readline"));
class InputCanceledError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.InputCanceledError = InputCanceledError;
function default_1(message) {
    return new Promise((resolve, reject) => {
        const rl = readline_1.default.createInterface(process.stdin, process.stdout);
        rl.question(message, (ans) => {
            rl.close();
            resolve(ans);
        });
        rl.on('SIGINT', () => {
            console.log('');
            rl.close();
            reject(new InputCanceledError('SIGINT interrupted'));
        });
    });
}
exports.default = default_1;
