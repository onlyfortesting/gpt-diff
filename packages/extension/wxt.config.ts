// import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'wxt';
import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { preprocessMeltUI } from '@melt-ui/pp'
import sequence from 'svelte-sequential-preprocessor'

import path from 'path'

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  manifest: {
    // default_locale: 'en',
    web_accessible_resources: [
      {
        resources: ['/iframe-src.html'],
        matches: ['*://*/*'],
      },
    ],
    permissions: [
      "contextMenus",
      "storage",
    ]
  },
  vite: () => ({
    resolve: {
      alias: {
        bits: path.resolve('../../node_modules/bits-ui/dist/bits'),
        '$lib': path.resolve('../web/src/lib'),
        'shared': path.resolve('../web/src/routes/(main)'),
        'common': path.resolve('./src/lib'),
      },
    },
    plugins: [
      // sveltekit()
      svelte({
        // Using a svelte.config.js file causes a segmentation fault when importing the file
        configFile: false,
        preprocess: [
          vitePreprocess(),
          sequence([
            preprocessMeltUI()
          ]),
        ],
      }),
    ],
  }),
});
