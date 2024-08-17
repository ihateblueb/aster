export declare const dynamicImportRE: RegExp;
export declare const normallyImporteeRE: RegExp;
export declare const viteIgnoreRE: RegExp;
export declare const bareImportRE: RegExp;
export declare const deepImportRE: RegExp;
export declare function hasDynamicImport(code: string): boolean;
/**
 * Unlimit depth match
 * @todo Use RegExp refactor
 */
export declare function toLooseGlob(glob: string): string | string[];
/**
 * e.g. `src/foo/index.js` and has alias(@)
 *
 * ```
 * const maps = {
 *   './foo/index.js': [
 *     '@/foo',
 *     '@/foo/index',
 *     '@/foo/index.js',
 *   ],
 * }
 * ```
 */
export declare function mappingPath(paths: string[], alias?: Record<string, string>): Record<string, string[]>;
