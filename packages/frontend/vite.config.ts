import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dynamicImport from 'vite-plugin-dynamic-import';

const apiurl = process.env.ASTERFE_API_URL
	? process.env.ASTERFE_API_URL
	: `http://localhost:9172/`;

export default defineConfig({
	plugins: [sveltekit(), dynamicImport({ loose: true })],
	server: {
		proxy: {
			'/api': {
				target: apiurl,
				changeOrigin: true
			},
			'/oauth': {
				target: apiurl,
				changeOrigin: true
			},
			'/openapi.json': {
				target: apiurl,
				changeOrigin: true
			},
			'/swagger': {
				target: apiurl,
				changeOrigin: true
			}
		}
	}
});
