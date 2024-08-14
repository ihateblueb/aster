// vite.config.ts
import { enhancedImages } from 'file:///home/blueb/Documents/aster/node_modules/.pnpm/@sveltejs+enhanced-img@0.3.0_rollup@4.17.2_svelte@4.2.16/node_modules/@sveltejs/enhanced-img/src/index.js';
import { sveltekit } from 'file:///home/blueb/Documents/aster/node_modules/.pnpm/@sveltejs+kit@2.5.7_@sveltejs+vite-plugin-svelte@3.1.0_svelte@4.2.16_vite@5.2.11_@types+node@_2fxmi3rahchqudxtaoq3uwrklq/node_modules/@sveltejs/kit/src/exports/vite/index.js';
import { defineConfig } from 'file:///home/blueb/Documents/aster/node_modules/.pnpm/vite@5.2.11_@types+node@20.12.11_sass@1.77.1/node_modules/vite/dist/node/index.js';
import dynamicImport from 'file:///home/blueb/Documents/aster/node_modules/.pnpm/vite-plugin-dynamic-import@1.5.0/node_modules/vite-plugin-dynamic-import/dist/index.mjs';
import { autoImportStyle } from 'file:///home/blueb/Documents/aster/packages/vite-plugin-svelte-auto-import-style/index.js';
let vite_config_default = defineConfig({
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
			'/uploads': {
				target: `http://localhost:9971/`,
				changeOrigin: true
			},
			'/admin/queue/dashboard': {
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
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9ibHVlYi9Eb2N1bWVudHMvYXN0ZXIvcGFja2FnZXMvZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2JsdWViL0RvY3VtZW50cy9hc3Rlci9wYWNrYWdlcy9mcm9udGVuZC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9ibHVlYi9Eb2N1bWVudHMvYXN0ZXIvcGFja2FnZXMvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBlbmhhbmNlZEltYWdlcyB9IGZyb20gJ0BzdmVsdGVqcy9lbmhhbmNlZC1pbWcnO1xuaW1wb3J0IHsgc3ZlbHRla2l0IH0gZnJvbSAnQHN2ZWx0ZWpzL2tpdC92aXRlJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IGR5bmFtaWNJbXBvcnQgZnJvbSAndml0ZS1wbHVnaW4tZHluYW1pYy1pbXBvcnQnO1xuaW1wb3J0IHsgYXV0b0ltcG9ydFN0eWxlIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZlbHRlLWF1dG8taW1wb3J0LXN0eWxlJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcblx0cGx1Z2luczogW1xuXHRcdGF1dG9JbXBvcnRTdHlsZSgpLFxuXHRcdHN2ZWx0ZWtpdCgpLFxuXHRcdGVuaGFuY2VkSW1hZ2VzKCksXG5cdFx0ZHluYW1pY0ltcG9ydCh7IGxvb3NlOiB0cnVlIH0pXG5cdF0sXG5cdHNlcnZlcjoge1xuXHRcdHByb3h5OiB7XG5cdFx0XHQnL2FwaSc6IHtcblx0XHRcdFx0dGFyZ2V0OiBgaHR0cDovL2xvY2FsaG9zdDo5OTcxL2AsXG5cdFx0XHRcdGNoYW5nZU9yaWdpbjogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdCcvdXBsb2Fkcyc6IHtcblx0XHRcdFx0dGFyZ2V0OiBgaHR0cDovL2xvY2FsaG9zdDo5OTcxL2AsXG5cdFx0XHRcdGNoYW5nZU9yaWdpbjogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdCcvYWRtaW4vcXVldWUvZGFzaGJvYXJkJzoge1xuXHRcdFx0XHR0YXJnZXQ6IGBodHRwOi8vbG9jYWxob3N0Ojk5NzEvYCxcblx0XHRcdFx0Y2hhbmdlT3JpZ2luOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0Jy9zb2NrZXQuaW8nOiB7XG5cdFx0XHRcdHRhcmdldDogYHdzOi8vbG9jYWxob3N0Ojk5NzEvYCxcblx0XHRcdFx0Y2hhbmdlT3JpZ2luOiB0cnVlLFxuXHRcdFx0XHR3czogdHJ1ZVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0ZnM6IHtcblx0XHRcdGFsbG93OiBbJy9ob21lL2JsdWViL0RvY3VtZW50cy9hc3Rlci9wYWNrYWdlcy9mcm9udGVuZC9zdGF0aWMnXVxuXHRcdH1cblx0fVxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlULFNBQVMsc0JBQXNCO0FBQ3hWLFNBQVMsaUJBQWlCO0FBQzFCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sbUJBQW1CO0FBQzFCLFNBQVMsdUJBQXVCO0FBRWhDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzNCLFNBQVM7QUFBQSxJQUNSLGdCQUFnQjtBQUFBLElBQ2hCLFVBQVU7QUFBQSxJQUNWLGVBQWU7QUFBQSxJQUNmLGNBQWMsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUFBLEVBQzlCO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTixRQUFRO0FBQUEsUUFDUCxRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsTUFDZjtBQUFBLE1BQ0EsWUFBWTtBQUFBLFFBQ1gsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLE1BQ2Y7QUFBQSxNQUNBLDBCQUEwQjtBQUFBLFFBQ3pCLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxNQUNmO0FBQUEsTUFDQSxjQUFjO0FBQUEsUUFDYixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxJQUFJO0FBQUEsTUFDTDtBQUFBLElBQ0Q7QUFBQSxJQUNBLElBQUk7QUFBQSxNQUNILE9BQU8sQ0FBQyxzREFBc0Q7QUFBQSxJQUMvRDtBQUFBLEVBQ0Q7QUFDRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
