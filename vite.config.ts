import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import viteCompression from 'vite-plugin-compression';
import path from 'path';

export default defineConfig(() => {
	return {
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
				assets: path.resolve(__dirname, 'src/assets/'),
			},
		},

		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler',
					additionalData: `
						@use "@/assets/scss/vite/colors";
					`,
				},
			},
		},

		plugins: [
			vue(),
			svgLoader({
				svgoConfig: {
					multipass: true,
					js2svg: {
						pretty: false,
						indent: 0,
					},
					plugins: [
						'sortAttrs',
						'removeDimensions',
						'removeTitle',
						'removeMetadata',
						'convertPathData',
					],
				},
			}),
			viteCompression({ algorithm: 'brotliCompress' }),
		],
	};
});
