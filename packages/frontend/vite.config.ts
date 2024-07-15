import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dynamicImport from 'vite-plugin-dynamic-import';
import { autoImportStyle } from 'vite-plugin-svelte-auto-import-style';

export default defineConfig({
	plugins: [
		autoImportStyle(),
		sveltekit(),
		enhancedImages(),
		dynamicImport({ loose: true })
	],
	server: {
		proxy: {
			'/api': {
				target: `http://localhost:9971/`,
				changeOrigin: true
			},
			'/socket.io': {
				target: `ws://localhost:9971/`,
				changeOrigin: true,
				ws: true
			}
		},
		fs: {
			allow: ['/home/blueb/Documents/aster/packages/frontend/static']
		}
	}
});
