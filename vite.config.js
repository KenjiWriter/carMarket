import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        vue({
            template: { transformAssetUrls }
        }),
        quasar({
            sassVariables: 'resources/css/quasar-variables.scss'
        })
    ],
    resolve: {
        alias: {
            // Jeśli potrzebujesz aliasów
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                // Dodatkowe opcje dla SCSS, jeśli potrzebne
            }
        }
    }
});