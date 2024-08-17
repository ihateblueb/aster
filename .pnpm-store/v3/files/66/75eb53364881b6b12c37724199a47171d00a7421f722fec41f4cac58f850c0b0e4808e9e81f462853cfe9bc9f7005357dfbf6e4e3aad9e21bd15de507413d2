import type { Alias, ResolvedConfig } from 'vite';
export interface Resolved {
    type: 'alias' | 'bare';
    alias: Omit<Alias, 'customResolver'> & {
        /** stringify of `Alias['find']` */
        findString: string;
        /** relative path of `Alias['replacement']` */
        relative: string;
    };
    import: {
        /**
         * 1. what the user passes in is what it is
         * 2. always starts with alias or bare
         */
        importee: string;
        importer: string;
        /** always relative path */
        resolved: string;
    };
}
/**
 * This is different from the resolve of Vite. Which only resolves `node_modules` and `alias` into relative paths.
 * 这和 Vite 的 resolve 并不一样，它只是将 node_modules、alias 解析成相对路径
 */
export declare class Resolve {
    private config;
    private resolve;
    constructor(config: ResolvedConfig, resolve?: import("vite").ResolveFn);
    /**
     * Resolve the relative path of alias or bare(module)
     * 解析 alias 或 bare(裸模块) 的相对路径
     */
    tryResolve(importee: string, importer: string): Promise<Resolved | undefined>;
    private tryResolveAlias;
    private tryResolveBare;
    private resolveAlias;
    private parseImportee;
}
