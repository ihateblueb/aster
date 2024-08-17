"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleParser = exports.fullParser = void 0;
const parser_1 = require("./parser");
const util_1 = require("./util");
function fullParser(input, opts) {
    const result = parser_1.language.fullParser.handler(input, 0, {
        nestLimit: (opts.nestLimit != null) ? opts.nestLimit : 20,
        depth: 0,
        linkLabel: false,
        trace: false,
    });
    return (0, util_1.mergeText)(result.value);
}
exports.fullParser = fullParser;
function simpleParser(input) {
    const result = parser_1.language.simpleParser.handler(input, 0, {});
    return (0, util_1.mergeText)(result.value);
}
exports.simpleParser = simpleParser;
