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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const perf_hooks_1 = require("perf_hooks");
const inputLine_1 = __importStar(require("./misc/inputLine"));
const __1 = require("..");
function entryPoint() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('intaractive parser');
        while (true) {
            let input;
            try {
                input = yield (0, inputLine_1.default)('> ');
            }
            catch (err) {
                if (err instanceof inputLine_1.InputCanceledError) {
                    console.log('bye.');
                    return;
                }
                throw err;
            }
            input = input
                .replace(/\\n/g, '\n')
                .replace(/\\t/g, '\t')
                .replace(/\\u00a0/g, '\u00a0');
            try {
                const parseTimeStart = perf_hooks_1.performance.now();
                const result = (0, __1.parse)(input);
                const parseTimeEnd = perf_hooks_1.performance.now();
                console.log(JSON.stringify(result));
                const parseTime = (parseTimeEnd - parseTimeStart).toFixed(3);
                console.log(`parsing time: ${parseTime}ms`);
            }
            catch (err) {
                console.log('parsing error:');
                console.log(err);
            }
            console.log();
        }
    });
}
entryPoint()
    .catch(err => {
    console.log(err);
    process.exit(1);
});
