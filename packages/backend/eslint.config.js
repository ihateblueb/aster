import pluginJs from '@eslint/js';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
	{ files: ['**/*.{js,mjs,cjs,ts}'] },
	{ languageOptions: { globals: globals.node } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		plugins: {
			'simple-import-sort': simpleImportSort
		},
		rules: {
			'prefer-const': 'off',
			'simple-import-sort/imports': 'warn',
			'simple-import-sort/exports': 'warn',

			// i cant do anything about typeorm
			'no-class-assign': 'off',
			'no-cond-assign': 'off'
		}
	}
];
