import type { Plugin } from 'vite';
import { hasDynamicImport, normallyImporteeRE, mappingPath, toLooseGlob } from './utils';
import { type Resolved, Resolve } from './resolve';
import { dynamicImportToGlob } from './dynamic-import-to-glob';
export { hasDynamicImport, normallyImporteeRE, mappingPath, toLooseGlob, type Resolved, Resolve, dynamicImportToGlob, globFiles, };
export declare const TAG = "[vite-plugin-dynamic-import]";
export interface Options {
    filter?: (id: string) => boolean | void;
    /**
     * ```
     * 1. `true` - Match all possibilities as much as possible, more like `webpack`
     * see https://webpack.js.org/guides/dependency-management/#require-with-expression
     *
     * 2. `false` - It behaves more like `@rollup/plugin-dynamic-import-vars`
     * see https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#how-it-works
     * ```
     *
     * @defaultValue true
     */
    loose?: boolean;
    /**
     * If you want to exclude some files
     * e.g `type.d.ts`, `interface.ts`
     */
    onFiles?: (files: string[], id: string) => typeof files | void;
    /**
     * Custom importee
     *
     * e.g. - append `\/*@vite-ignore*\/` in front of importee to bypass to Vite
     */
    onResolve?: (rawImportee: string, id: string) => typeof rawImportee | void;
}
export default function dynamicImport(options?: Options): Plugin;
declare function globFiles({ importeeNode, importExpression, importer, resolve, extensions, loose, }: {
    importeeNode: AcornNode;
    importExpression: string;
    /** Used to calculate relative paths */
    importer: string;
    resolve: Resolve;
    /** Importable file extensions */
    extensions: string[];
    /** Match unlimited levels of subdir as much as possible */
    loose?: boolean;
}): Promise<{
    files?: string[];
    resolved?: Resolved;
    /**
     * 🚧-③ After `expressiontoglob()` processing, it may become a normal path
     *
     * In v2.9.9 Vite has handled internally(2022-06-09) ????
     * import('@/views/' + 'foo.js')
     * ↓
     * import('@/views/foo.js')
     */
    normally?: string;
} | undefined>;
