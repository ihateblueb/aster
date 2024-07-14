import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dynamicImport from 'vite-plugin-dynamic-import';

import config from '../../packages/backend/src/utils/config';

export default defineConfig({
	plugins: [sveltekit(), enhancedImages(), dynamicImport({ loose: true })],
	server: {
		proxy: {
			'/api': {
				target: `http://localhost:${config.port}/`,
				changeOrigin: true
			}
		}
	}
});
