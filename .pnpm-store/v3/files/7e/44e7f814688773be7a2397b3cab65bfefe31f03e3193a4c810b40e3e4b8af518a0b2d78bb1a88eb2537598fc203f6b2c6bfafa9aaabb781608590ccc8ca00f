export type Success<T> = {
    success: true;
    value: T;
    index: number;
};
export type Failure = {
    success: false;
};
export type Result<T> = Success<T> | Failure;
export type ParserHandler<T> = (input: string, index: number, state: any) => Result<T>;
export declare function success<T>(index: number, value: T): Success<T>;
export declare function failure(): Failure;
export declare class Parser<T> {
    name?: string;
    handler: ParserHandler<T>;
    constructor(handler: ParserHandler<T>, name?: string);
    map<U>(fn: (value: T) => U): Parser<U>;
    text(): Parser<string>;
    many(min: number): Parser<T[]>;
    sep(separator: Parser<any>, min: number): Parser<T[]>;
    option<T>(): Parser<T | null>;
}
export declare function str<T extends string>(value: T): Parser<T>;
export declare function regexp<T extends RegExp>(pattern: T): Parser<string>;
export declare function seq(parsers: Parser<any>[], select?: number): Parser<any>;
export declare function alt(parsers: Parser<any>[]): Parser<any>;
export declare function notMatch(parser: Parser<any>): Parser<null>;
export declare const cr: Parser<"\r">;
export declare const lf: Parser<"\n">;
export declare const crlf: Parser<"\r\n">;
export declare const newline: Parser<any>;
export declare const char: Parser<string>;
export declare const lineBegin: Parser<null>;
export declare const lineEnd: Parser<null>;
export declare function lazy<T>(fn: () => Parser<T>): Parser<T>;
export declare function createLanguage<T>(syntaxes: {
    [K in keyof T]: (r: Record<string, Parser<any>>) => T[K];
}): T;
