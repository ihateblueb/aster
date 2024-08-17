/**
 * This is slightly different from '@rollup/plugin-dynamic-import-vars', added a `resolver`
 * 这与 '@rollup/plugin-dynamic-import-vars' 略有不同，增加了一个 resolver
 *
 * @see https://github.com/rollup/plugins/blob/master/packages/dynamic-import-vars/src/dynamic-import-to-glob.js
 */
export declare function dynamicImportToGlob(importeeNode: AcornNode, importExpression: string, 
/**
 * The `resolver` for processing alias or bare(node_modules),
 * and try to add extension for compatible restrict of '@rollup/plugin-dynamic-import-vars'
 *
 *```
 * e.g.
 * import(`@/foo/${bar}`)
 * ↓
 * import(`./foo/${bar}.extension`)
 *
 * import(`@ant-design/icons/es/icons/${name}Outlined`)
 * ↓
 * import(`./node_modules/icons/es/icons/${name}Outlined.extension`)
 * ```
 */
resolver?: (glob: string) => string | Promise<string>): Promise<string | null>;
