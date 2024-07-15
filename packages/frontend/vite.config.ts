import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dynamicImport from 'vite-plugin-dynamic-import';
import fs from 'fs';

function scssAutoImport() {
	return {
		name: 'vite-plugin-svelte-scss-auto-import',
		load() {
			return;
		},
		transform(code, id) {
			let pageRegex = /(\+page)\.(svelte)$/;
			let componentRegex = /((?:[a-zA-Z0-9]+))\.svelte$/;

			if (pageRegex.test(id)) {
				let scssPath = id.replace('+page.svelte', '+page.scss');

				if (fs.existsSync(scssPath)) {
					return code + `import './+page.scss';`;
				} else {
					return;
				}
			} else if (id.match(componentRegex)) {
				let scssPath = id.replace(
					id.match(componentRegex)[1] + '.svelte',
					id.match(componentRegex)[1] + '.scss'
				);

				if (fs.existsSync(scssPath)) {
					return (
						code +
						`import './${id.match(componentRegex)[1] + '.scss'}';`
					);
				} else {
					return;
				}
			} else {
				return;
			}
		}
	};
}

export default defineConfig({
	plugins: [
		scssAutoImport(),
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
