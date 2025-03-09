import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dynamicImport from 'vite-plugin-dynamic-import';
import optimizeTabler from './vite-plugin-optimize-tabler.js';

const apiurl = process.env.ASTERFE_API_URL
	? process.env.ASTERFE_API_URL
	: `http://localhost:9972/`;

export default defineConfig({
	plugins: [sveltekit(), dynamicImport({ loose: true }), optimizeTabler()],
	server: {
		proxy: {
			'/api': {
				target: apiurl,
				changeOrigin: true
			},
			'/api/streaming': {
				target: apiurl,
				changeOrigin: true,
				rewriteWsOrigin: true,
				ws: true
			},
			'/oauth': {
				target: apiurl,
				changeOrigin: true
			},
			'/openapi.json': {
				target: apiurl,
				changeOrigin: true
			},
			'/api-doc': {
				target: apiurl,
				changeOrigin: true
			},
			'/admin/queue': {
				target: apiurl,
				changeOrigin: true
			},
			'/upload': {
				target: apiurl,
				changeOrigin: true
			},
			'/uploads': {
				target: apiurl,
				changeOrigin: true
			},
			'/manifest.json': {
				target: apiurl,
				changeOrigin: true
			}
		}
	},
	css: {
		preprocessorOptions: {}
	}
});
