"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLanguage = exports.lazy = exports.lineEnd = exports.lineBegin = exports.char = exports.newline = exports.crlf = exports.lf = exports.cr = exports.notMatch = exports.alt = exports.seq = exports.regexp = exports.str = exports.Parser = exports.failure = exports.success = void 0;
function success(index, value) {
    return {
        success: true,
        value: value,
        index: index,
    };
}
exports.success = success;
function failure() {
    return { success: false };
}
exports.failure = failure;
class Parser {
    constructor(handler, name) {
        this.handler = (input, index, state) => {
            if (state.trace && this.name != null) {
                const pos = `${index}`;
                console.log(`${pos.padEnd(6, ' ')}enter ${this.name}`);
                const result = handler(input, index, state);
                if (result.success) {
                    const pos = `${index}:${result.index}`;
                    console.log(`${pos.padEnd(6, ' ')}match ${this.name}`);
                }
                else {
                    const pos = `${index}`;
                    console.log(`${pos.padEnd(6, ' ')}fail ${this.name}`);
                }
                return result;
            }
            return handler(input, index, state);
        };
        this.name = name;
    }
    map(fn) {
        return new Parser((input, index, state) => {
            const result = this.handler(input, index, state);
            if (!result.success) {
                return result;
            }
            return success(result.index, fn(result.value));
        });
    }
    text() {
        return new Parser((input, index, state) => {
            const result = this.handler(input, index, state);
            if (!result.success) {
                return result;
            }
            const text = input.slice(index, result.index);
            return success(result.index, text);
        });
    }
    many(min) {
        return new Parser((input, index, state) => {
            let result;
            let latestIndex = index;
            const accum = [];
            while (latestIndex < input.length) {
                result = this.handler(input, latestIndex, state);
                if (!result.success) {
                    break;
                }
                latestIndex = result.index;
                accum.push(result.value);
            }
            if (accum.length < min) {
                return failure();
            }
            return success(latestIndex, accum);
        });
    }
    sep(separator, min) {
        if (min < 1) {
            throw new Error('"min" must be a value greater than or equal to 1.');
        }
        return seq([
            this,
            seq([
                separator,
                this,
            ], 1).many(min - 1),
        ]).map(result => [result[0], ...result[1]]);
    }
    option() {
        return alt([
            this,
            succeeded(null),
        ]);
    }
}
exports.Parser = Parser;
function str(value) {
    return new Parser((input, index, _state) => {
        if ((input.length - index) < value.length) {
            return failure();
        }
        if (input.substr(index, value.length) !== value) {
            return failure();
        }
        return success(index + value.length, value);
    });
}
exports.str = str;
function regexp(pattern) {
    const re = RegExp(`^(?:${pattern.source})`, pattern.flags);
    return new Parser((input, index, _state) => {
        const text = input.slice(index);
        const result = re.exec(text);
        if (result == null) {
            return failure();
        }
        return success(index + result[0].length, result[0]);
    });
}
exports.regexp = regexp;
function seq(parsers, select) {
    return new Parser((input, index, state) => {
        let result;
        let latestIndex = index;
        const accum = [];
        for (let i = 0; i < parsers.length; i++) {
            result = parsers[i].handler(input, latestIndex, state);
            if (!result.success) {
                return result;
            }
            latestIndex = result.index;
            accum.push(result.value);
        }
        return success(latestIndex, (select != null ? accum[select] : accum));
    });
}
exports.seq = seq;
function alt(parsers) {
    return new Parser((input, index, state) => {
        let result;
        for (let i = 0; i < parsers.length; i++) {
            result = parsers[i].handler(input, index, state);
            if (result.success) {
                return result;
            }
        }
        return failure();
    });
}
exports.alt = alt;
function succeeded(value) {
    return new Parser((_input, index, _state) => {
        return success(index, value);
    });
}
function notMatch(parser) {
    return new Parser((input, index, state) => {
        const result = parser.handler(input, index, state);
        return !result.success
            ? success(index, null)
            : failure();
    });
}
exports.notMatch = notMatch;
exports.cr = str('\r');
exports.lf = str('\n');
exports.crlf = str('\r\n');
exports.newline = alt([exports.crlf, exports.cr, exports.lf]);
exports.char = new Parser((input, index, _state) => {
    if ((input.length - index) < 1) {
        return failure();
    }
    const value = input.charAt(index);
    return success(index + 1, value);
});
exports.lineBegin = new Parser((input, index, state) => {
    if (index === 0) {
        return success(index, null);
    }
    if (exports.cr.handler(input, index - 1, state).success) {
        return success(index, null);
    }
    if (exports.lf.handler(input, index - 1, state).success) {
        return success(index, null);
    }
    return failure();
});
exports.lineEnd = new Parser((input, index, state) => {
    if (index === input.length) {
        return success(index, null);
    }
    if (exports.cr.handler(input, index, state).success) {
        return success(index, null);
    }
    if (exports.lf.handler(input, index, state).success) {
        return success(index, null);
    }
    return failure();
});
function lazy(fn) {
    const parser = new Parser((input, index, state) => {
        parser.handler = fn().handler;
        return parser.handler(input, index, state);
    });
    return parser;
}
exports.lazy = lazy;
function createLanguage(syntaxes) {
    const rules = {};
    for (const key of Object.keys(syntaxes)) {
        rules[key] = lazy(() => {
            const parser = syntaxes[key](rules);
            if (parser == null) {
                throw new Error('syntax must return a parser.');
            }
            parser.name = key;
            return parser;
        });
    }
    return rules;
}
exports.createLanguage = createLanguage;
