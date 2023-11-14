import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import imagePresets, { widthPreset } from 'vite-plugin-image-presets'

export default defineConfig({
  plugins: [
    sveltekit(),
    imagePresets({
      thumbnail: widthPreset({
        class: 'img featured',
        loading: 'lazy',
        widths: [800, 500],
        formats: {
          jpg: { quality: 70 },
        },
      }),
    }),
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  }
});
