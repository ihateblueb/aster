import pluginJs from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
	{
		languageOptions: { globals: globals.browser },
		'no-redeclare': ['warn', 'always']
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended
];
