import react from '@vitejs/plugin-react-swc'
import laravel from 'laravel-vite-plugin'
// import analyze from 'rollup-plugin-analyzer'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    base: './',
    plugins: [
        laravel({
            input: [
                '#admin/variables/index.scss',
                '#admin/mixins/index.scss',
                '#admin/utils/index.scss',
                '#admin/index.scss',
                '#admin/reset.scss',
                // '#/variables/index.scss',
                // '#/mixins/index.scss',
                // '#/utils/index.scss',
                // '#/index.scss',
                '/resources/app.tsx',
                '/resources/site/styles/index.scss',
            ],
            refresh: true,
        }),
        splitVendorChunkPlugin(),
        react({ tsDecorators: true, devTarget: 'esnext' }),
        tsconfigPaths(),
    ],
    resolve: {
        alias: {
            '@admin': '/resources/admin',
            '#admin': '/resources/admin/styles',

            '@global': '/resources/global',
            '#global': '/resources/global/styles',

            '@': '/resources/site',
            '#': '/resources/site/styles',

            '@public': '/public',
        },
    },
    server: {
        host: '0.0.0.0',
        hmr: {
            host: 'localhost',
        },
    },
    // build: {
    //     rollupOptions: {
    //         plugins: [analyze()],
    //     },
    // },
})
