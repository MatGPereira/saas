import { defineConfig, defaultExclude } from 'vitest/config';
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [tsConfigPaths()],
	test: {
		exclude: [...defaultExclude],
		coverage: {
			reporter: ['html'],
		},
		benchmark: { /* ... */ }
	},
});
