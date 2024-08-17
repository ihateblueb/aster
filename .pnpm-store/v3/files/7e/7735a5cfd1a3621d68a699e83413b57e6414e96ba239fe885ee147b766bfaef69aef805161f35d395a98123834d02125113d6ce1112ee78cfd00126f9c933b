"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extract = exports.inspect = exports.toString = exports.parseSimple = exports.parse = void 0;
const internal_1 = require("./internal");
const util_1 = require("./internal/util");
function parse(input, opts = {}) {
    const nodes = (0, internal_1.fullParser)(input, {
        nestLimit: opts.nestLimit,
    });
    return nodes;
}
exports.parse = parse;
function parseSimple(input) {
    const nodes = (0, internal_1.simpleParser)(input);
    return nodes;
}
exports.parseSimple = parseSimple;
function toString(node) {
    if (Array.isArray(node)) {
        return (0, util_1.stringifyTree)(node);
    }
    else {
        return (0, util_1.stringifyNode)(node);
    }
}
exports.toString = toString;
function inspect(node, action) {
    if (Array.isArray(node)) {
        for (const n of node) {
            (0, util_1.inspectOne)(n, action);
        }
    }
    else {
        (0, util_1.inspectOne)(node, action);
    }
}
exports.inspect = inspect;
function extract(nodes, predicate) {
    const dest = [];
    inspect(nodes, (node) => {
        if (predicate(node)) {
            dest.push(node);
        }
    });
    return dest;
}
exports.extract = extract;
