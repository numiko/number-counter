import dts from 'vite-plugin-dts';
import path from 'path';
import eslint from 'vite-plugin-eslint';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    eslint(),
    dts({
      tsconfigPath: './tsconfig.dts.json',
      entryRoot: 'lib',
      outDir: 'dist',
      rollupTypes: true
    })
  ],
  server: {
    watch: {
      include: ['src/**', 'lib/**']
    }
  },
  test: {
    environment: 'happy-dom',
    coverage: {
      include: ['lib/']
    }
  },
  build: {
    lib: {
      entry: path.resolve(import.meta.dirname, 'lib/NumberCounter.ts'),
      name: 'NumberCounter',
      fileName: (format) => `NumberCounter.${format}.js`
    },
    rolldownOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['gsap'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          gsap: 'gsap',
        },
      },
    },
  }
});
