"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const fs = require("node:fs");
const path = require("node:path");
const esModuleLexer = require("es-module-lexer");
const acorn = require("acorn");
const fastGlob = require("fast-glob");
const MagicString = require("magic-string");
const os = require("node:os");
const DEFAULT_EXTENSIONS = [
  ".mjs",
  ".js",
  ".mts",
  ".ts",
  ".jsx",
  ".tsx",
  ".json"
];
const multilineCommentsRE = /\/\*(.|[\r\n])*?\*\//gm;
const singlelineCommentsRE = /\/\/.*/g;
function cleanUrl(url) {
  const queryRE = /\?.*$/s;
  const hashRE = /#.*$/s;
  return url.replace(hashRE, "").replace(queryRE, "");
}
function relativeify(relativePath) {
  if (relativePath === "") {
    return ".";
  }
  if (!/^\.{1,2}[/\\]/.test(relativePath)) {
    return "./" + relativePath;
  }
  return relativePath;
}
const isWindows = os.platform() === "win32";
function slash(p) {
  return p.replace(/\\/g, "/");
}
function normalizePath(id) {
  return path.posix.normalize(isWindows ? slash(id) : id);
}
const COLOURS = {
  $: (c) => (str) => `\x1B[${c}m` + str + "\x1B[0m",
  gary: (str) => COLOURS.$(90)(str),
  cyan: (str) => COLOURS.$(36)(str),
  yellow: (str) => COLOURS.$(33)(str),
  green: (str) => COLOURS.$(32)(str),
  red: (str) => COLOURS.$(31)(str)
};
const VOLUME_RE = /^[A-Z]:/i;
function node_modules(root, paths = []) {
  if (!root)
    return paths;
  if (!(root.startsWith("/") || VOLUME_RE.test(root)))
    return paths;
  const p = path.posix.join(normalizePath(root), "node_modules");
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) {
    paths = paths.concat(p);
  }
  root = path.posix.join(root, "..");
  return root === "/" || /^[A-Z]:$/i.test(root) ? paths : node_modules(root, paths);
}
const dynamicImportRE = /\bimport[\s\r\n]*?\(/;
const normallyImporteeRE = /^\.{1,2}\/[.-/\w]+(\.\w+)$/;
const viteIgnoreRE = /\/\*\s*@vite-ignore\s*\*\//;
function hasDynamicImport(code) {
  code = code.replace(singlelineCommentsRE, "").replace(multilineCommentsRE, "");
  return dynamicImportRE.test(code);
}
function toLooseGlob(glob) {
  if (glob.includes("**"))
    return glob;
  const lastIndex = glob.lastIndexOf("*");
  let tail = "";
  if (lastIndex > -1) {
    tail = glob.slice(lastIndex + 1);
    glob = glob.slice(0, lastIndex + 1);
  }
  if (glob.endsWith("/*")) {
    return glob + "*/*" + tail;
  }
  if (glob.endsWith("*")) {
    return [
      glob + tail,
      // original
      glob + "/**" + (tail.startsWith("/") ? tail : "/*" + tail)
      // 🚨 not strict
    ];
  }
  return glob + tail;
}
function mappingPath(paths, alias) {
  const maps = {};
  for (const p of paths) {
    let importee = p;
    if (alias) {
      const [find, replacement] = Object.entries(alias)[0];
      importee = p.replace(find, replacement);
    }
    const ext = path.extname(importee);
    maps[p] = [
      // @/foo
      importee.endsWith(`/index${ext}`) && importee.replace(`/index${ext}`, ""),
      // @/foo/index
      importee.replace(ext, ""),
      // @/foo/index.js
      importee
    ].filter(Boolean);
  }
  return maps;
}
class Resolve {
  constructor(config, resolve = config.createResolver()) {
    this.config = config;
    this.resolve = resolve;
  }
  /**
   * Resolve the relative path of alias or bare(module)  
   * 解析 alias 或 bare(裸模块) 的相对路径  
   */
  async tryResolve(importee, importer) {
    return await this.tryResolveAlias(importee, importer) || this.tryResolveBare(importee, importer);
  }
  async tryResolveAlias(importee, importer) {
    const { importee: ipte, importeeRaw = ipte } = this.parseImportee(importee);
    const resolvedId = await this.resolve(ipte, importer, true);
    if (!resolvedId)
      return;
    const alias = this.config.resolve.alias.find(
      (a) => a.find instanceof RegExp ? a.find.test(ipte) : ipte.startsWith(a.find + /* 🚧-④ */
      "/")
    );
    if (!alias)
      return;
    const { find } = alias;
    const replacement = normalizePath(alias.replacement);
    const findString = find instanceof RegExp ? find.exec(importee)[0] : find;
    const relativePath = replacement.startsWith(".") ? replacement : relativeify(path.posix.relative(path.dirname(importer), replacement));
    const resolvedAlias = {
      ...alias,
      findString,
      relative: findString.endsWith("/") ? relativePath.endsWith("/") ? relativePath : relativePath + "/" : relativePath
    };
    return {
      type: "alias",
      ...this.resolveAlias(importeeRaw, importer, resolvedAlias)
    };
  }
  tryResolveBare(importee, importer) {
    const { importee: ipte, importeeRaw = ipte } = this.parseImportee(importee);
    if (/^[\.\/]/.test(ipte)) {
      return;
    }
    const node_modules_paths = node_modules(importer);
    const paths = ipte.split("/");
    let level = "";
    let find, replacement;
    let p;
    while (p = paths.shift()) {
      level = path.posix.join(level, p);
      for (const node_modules2 of node_modules_paths) {
        const fullPath = path.join(node_modules2, level);
        if (fs.existsSync(fullPath)) {
          find = level;
          const relativePath = relativeify(path.posix.relative(path.dirname(importer), node_modules2));
          replacement = `${relativePath}/${level}`;
          break;
        }
      }
    }
    if (!find)
      return;
    const alias = {
      find,
      replacement,
      findString: find,
      relative: replacement.startsWith(".") ? replacement : relativeify(path.posix.relative(path.dirname(importer), replacement))
    };
    return {
      type: "bare",
      ...this.resolveAlias(importeeRaw, importer, alias)
    };
  }
  resolveAlias(importee, importer, alias) {
    const { find } = alias;
    const replacement = normalizePath(alias.replacement);
    let {
      importee: ipte,
      importeeRaw = ipte,
      startQuotation = ""
    } = this.parseImportee(importee);
    if (replacement.startsWith(".")) {
      ipte = ipte.replace(find, replacement);
    } else {
      const relativePath = relativeify(path.posix.relative(
        // Usually, the `replacement` we use is the directory path
        // So we also use the `path.dirname` path for calculation
        path.dirname(
          /* 🚧-① */
          importer
        ),
        replacement
      ));
      ipte = ipte.replace(find instanceof RegExp ? find : find + /* 🚧-④ */
      "/", "");
      ipte = `${relativePath}/${ipte}`;
    }
    return {
      alias,
      import: {
        importee: importeeRaw,
        importer,
        resolved: startQuotation + ipte
      }
    };
  }
  parseImportee(importee) {
    const result = { importee };
    if (/^[`'"]/.test(importee)) {
      result.importee = importee.slice(1);
      result.importeeRaw = importee;
      result.startQuotation = importee.slice(0, 1);
    }
    return result;
  }
}
const example = "For example: import(`./foo/${bar}.js`).";
function sanitizeString(str) {
  if (str.includes("*")) {
    throw new Error("A dynamic import cannot contain * characters.");
  }
  return str;
}
function templateLiteralToGlob(node) {
  let glob = "";
  for (let i = 0; i < node.quasis.length; i += 1) {
    glob += sanitizeString(node.quasis[i].value.raw);
    if (node.expressions[i]) {
      glob += expressionToGlob(node.expressions[i]);
    }
  }
  return glob;
}
function callExpressionToGlob(node) {
  const { callee } = node;
  if (callee.type === "MemberExpression" && callee.property.type === "Identifier" && callee.property.name === "concat") {
    return `${expressionToGlob(callee.object)}${node.arguments.map(expressionToGlob).join("")}`;
  }
  return "*";
}
function binaryExpressionToGlob(node) {
  if (node.operator !== "+") {
    throw new Error(`${node.operator} operator is not supported.`);
  }
  return `${expressionToGlob(node.left)}${expressionToGlob(node.right)}`;
}
function expressionToGlob(node) {
  switch (node.type) {
    case "TemplateLiteral":
      return templateLiteralToGlob(node);
    case "CallExpression":
      return callExpressionToGlob(node);
    case "BinaryExpression":
      return binaryExpressionToGlob(node);
    case "Literal":
      return sanitizeString(node.value);
    default:
      return "*";
  }
}
async function dynamicImportToGlob(importeeNode, importExpression, resolver) {
  let glob = expressionToGlob(importeeNode);
  glob = await (resolver == null ? void 0 : resolver(glob)) ?? glob;
  if (!glob.includes("*") || glob.startsWith("data:")) {
    return null;
  }
  glob = glob.replace(/\*\*/g, "*");
  if (glob.startsWith("*")) {
    throw new Error(
      `invalid import "${importExpression}". It cannot be statically analyzed. Variable dynamic imports must start with ./ and be limited to a specific directory. ${example}`
    );
  }
  if (glob.startsWith("/")) {
    throw new Error(
      `invalid import "${importExpression}". Variable absolute imports are not supported, imports must start with ./ in the static part of the import. ${example}`
    );
  }
  if (!glob.startsWith("./") && !glob.startsWith("../")) {
    throw new Error(
      `invalid import "${importExpression}". Variable bare imports are not supported, imports must start with ./ in the static part of the import. ${example}`
    );
  }
  const ownDirectoryStarExtension = /^\.\/\*\.[\w]+$/;
  if (ownDirectoryStarExtension.test(glob)) {
    throw new Error(
      `invalid import "${importExpression}". Variable imports cannot import their own directory, place imports in a separate directory or make the import filename more specific. ${example}`
    );
  }
  if (path.extname(glob) === "") {
    throw new Error(
      `invalid import "${importExpression}". A file extension must be included in the static part of the import. ${example}`
    );
  }
  return glob;
}
const TAG = "[vite-plugin-dynamic-import]";
function dynamicImport(options = {}) {
  let config;
  let resolve;
  let extensions = DEFAULT_EXTENSIONS;
  return {
    name: "vite-plugin-dynamic-import",
    configResolved(_config) {
      var _a, _b, _c;
      config = _config;
      resolve = new Resolve(_config);
      if ((_a = config.resolve) == null ? void 0 : _a.extensions)
        extensions = config.resolve.extensions;
      (_b = _config.optimizeDeps).esbuildOptions ?? (_b.esbuildOptions = {});
      (_c = _config.optimizeDeps.esbuildOptions).plugins ?? (_c.plugins = []);
      _config.optimizeDeps.esbuildOptions.plugins.push({
        name: "vite-plugin-dynamic-import:pre-bundle",
        setup(build) {
          build.onLoad({ filter: /.*/ }, async ({ path: id }) => {
            let code;
            try {
              code = fs.readFileSync(id, "utf8");
            } catch (error) {
              return;
            }
            const result = await transformDynamicImport({
              options,
              code,
              id,
              resolve,
              extensions
            });
            if (result != null) {
              return {
                contents: result.code,
                loader: id.slice(id.lastIndexOf(".") + 1)
              };
            }
          });
        }
      });
    },
    transform(code, id) {
      return transformDynamicImport({
        options,
        code,
        id,
        resolve,
        extensions
      });
    }
  };
}
async function transformDynamicImport({
  options,
  code,
  id,
  resolve,
  extensions
}) {
  var _a, _b;
  if (!(extensions.includes(path.extname(id)) || extensions.includes(path.extname(cleanUrl(id)))))
    return;
  if (!hasDynamicImport(code))
    return;
  const userCondition = (_a = options.filter) == null ? void 0 : _a.call(options, id);
  if (userCondition === false)
    return;
  if (userCondition !== true && id.includes("node_modules"))
    return;
  await esModuleLexer.init;
  let imports = [];
  try {
    imports = esModuleLexer.parse(code)[0];
  } catch (e) {
    return null;
  }
  if (!imports.length) {
    return null;
  }
  const ms = new MagicString(code);
  let dynamicImportIndex = 0;
  const runtimeFunctions = [];
  for (let index = 0; index < imports.length; index++) {
    const {
      s: start,
      e: end,
      ss: expStart,
      se: expEnd,
      d: dynamicIndex
    } = imports[index];
    if (dynamicIndex === -1)
      continue;
    const importExpression = code.slice(expStart, expEnd);
    let rawImportee = code.slice(start, end);
    const userImportee = (_b = options.onResolve) == null ? void 0 : _b.call(options, rawImportee, id);
    if (userImportee) {
      rawImportee = userImportee;
    }
    if (viteIgnoreRE.test(importExpression))
      continue;
    const ast = acorn.parse(importExpression, { sourceType: "module", ecmaVersion: 2020 });
    const importExpressionAst = ast.body[0].expression;
    if (importExpressionAst.type !== "ImportExpression")
      continue;
    if (importExpressionAst.source.type === "Literal") {
      const importee = rawImportee.slice(1, -1);
      if (normallyImporteeRE.test(importee))
        continue;
      const rsld = await resolve.tryResolve(importee, id);
      if (rsld && normallyImporteeRE.test(rsld.import.resolved)) {
        ms.overwrite(expStart, expEnd, `import("${rsld.import.resolved}")`);
        continue;
      }
    }
    const globResult = await globFiles({
      importeeNode: importExpressionAst.source,
      importExpression,
      importer: id,
      resolve,
      extensions,
      loose: options.loose !== false
    });
    if (!globResult)
      continue;
    let { files, resolved, normally } = globResult;
    if (normally) {
      ms.overwrite(expStart, expEnd, `import('${normally}')`);
      continue;
    }
    if (!(files == null ? void 0 : files.length)) {
      console.log(
        TAG,
        COLOURS.yellow(`no files matched: ${importExpression}
`),
        `  file: ${id}`
      );
      continue;
    }
    files = files.filter((f) => path.posix.join(path.dirname(id), f) !== id);
    options.onFiles && (files = options.onFiles(files, id) || files);
    const mapAlias = resolved ? { [resolved.alias.relative]: resolved.alias.findString } : void 0;
    const maps = mappingPath(files, mapAlias);
    const runtimeName = `__variableDynamicImportRuntime${dynamicImportIndex++}__`;
    const runtimeFn = generateDynamicImportRuntime(maps, runtimeName);
    ms.overwrite(expStart, expEnd, `${runtimeName}(${rawImportee})`);
    runtimeFunctions.push(runtimeFn);
  }
  if (runtimeFunctions.length) {
    ms.append([
      `// ${TAG} runtime -S-`,
      ...runtimeFunctions,
      `// ${TAG} runtime -E-`
    ].join("\n"));
  }
  if (ms.hasChanged()) {
    return {
      code: ms.toString(),
      map: ms.generateMap({ hires: true, source: id })
    };
  }
}
async function globFiles({
  importeeNode,
  importExpression,
  importer,
  resolve,
  extensions,
  loose = true
}) {
  let files;
  let resolved;
  let normally;
  const PAHT_FILL = "####/";
  const EXT_FILL = ".extension";
  let glob;
  let globRaw;
  glob = await dynamicImportToGlob(
    importeeNode,
    importExpression,
    async (raw) => {
      globRaw = raw;
      resolved = await resolve.tryResolve(raw, importer);
      if (resolved) {
        raw = resolved.import.resolved;
      }
      if (!path.extname(raw)) {
        raw = raw + EXT_FILL;
      }
      if (/^\.\/\*\.\w+$/.test(raw)) {
        raw = raw.replace("./*", `./${PAHT_FILL}*`);
      }
      return raw;
    }
  );
  if (!glob) {
    if (normallyImporteeRE.test(globRaw)) {
      normally = globRaw;
      return { normally };
    }
    return;
  }
  const globs = [].concat(loose ? toLooseGlob(glob) : glob).map((g) => {
    g.includes(PAHT_FILL) && (g = g.replace(PAHT_FILL, ""));
    g.endsWith(EXT_FILL) && (g = g.replace(EXT_FILL, ""));
    return g;
  });
  const fileGlobs = globs.map(
    (g) => path.extname(g) ? g : g + `.{${extensions.map((e) => e.replace(/^\./, "")).join(",")}}`
  );
  files = fastGlob.sync(fileGlobs, { cwd: (
    /* 🚧-① */
    path.dirname(importer)
  ) }).map((file) => relativeify(file));
  return { files, resolved };
}
function generateDynamicImportRuntime(maps, name) {
  const groups = Object.entries(maps).map(
    ([localFile, importeeList]) => importeeList.map((importee) => `    case '${importee}':`).concat(`      return import('${localFile}');`)
  );
  return `function ${name}(path) {
  switch (path) {
${groups.flat().join("\n")}
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
  }
}`;
}
exports.Resolve = Resolve;
exports.TAG = TAG;
exports.default = dynamicImport;
exports.dynamicImportToGlob = dynamicImportToGlob;
exports.globFiles = globFiles;
exports.hasDynamicImport = hasDynamicImport;
exports.mappingPath = mappingPath;
exports.normallyImporteeRE = normallyImporteeRE;
exports.toLooseGlob = toLooseGlob;
