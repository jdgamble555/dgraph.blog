import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

import { resolve } from 'path';

const config: UserConfig = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'$components': resolve('src/components'),
			'$modules': resolve('src/modules'),
			'$routes': resolve('src/routes'),
			'$stores': resolve('src/stores')
		}
	}
};

export default config;
