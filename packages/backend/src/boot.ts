import pkg from '../../../package.json' with { type: 'json' };

process.title = `Aster v${pkg.version} (Boot)`;
