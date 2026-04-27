import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: 'Flowr - Community Renders',
        namespace: 'npm/vite-plugin-monkey',
        description: 'A free, publicly available project for showcasing community-made renders.',
        author: 'Guest, Jad, Mythicbee, NGL880 (artists), PigeonBar (coder)',
        icon: 'https://www.google.com/s2/favicons?sz=64&domain=flowr.fun',
        match: ['https://flowr.fun/'],
        downloadURL: 'https://github.com/PigeonBar/flowr-community-renders/raw/refs/heads/main/dist/community-renders.user.js',
        updateURL: 'https://github.com/PigeonBar/flowr-community-renders/raw/refs/heads/main/dist/community-renders.user.js',
      },
      build: {
        fileName: 'community-renders.user.js',
      },
    }),
  ],
});
