import cfPagesAdapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/kit/vite';

import { mdsvex } from 'mdsvex'
import remarkGfm from 'remark-gfm'
import remarkFigureCaption from '@microflash/remark-figure-caption'
import rehypeExternalLinks from 'rehype-external-links'

import remarkHeading from './src/lib/remark-heading-id.js'
import highlighter from './src/lib/shiki-highlighter.js'

import { preprocessMeltUI } from '@melt-ui/pp'
import sequence from 'svelte-sequential-preprocessor'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.svelte.md', '.md', '.svx'],
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    vitePreprocess(),
    sequence([
      mdsvex({
        extensions: ['.md', '.svx'],
        highlight: {
          highlighter,
        },
        remarkPlugins: [
          remarkGfm,
          remarkFigureCaption,
          remarkHeading,
        ],
        rehypePlugins: [
          [rehypeExternalLinks, {
            target: "_blank",
            rel: "noopener noreferrer"
          }],
        ],
      }),
      preprocessMeltUI() // add to the end!
    ]),
  ],

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    // adapter: adapter()
    adapter: cfPagesAdapter({
      routes: {
        include: ['/*'],
        exclude: ['<all>'],
      }
    }),
  }
};

export default config;
