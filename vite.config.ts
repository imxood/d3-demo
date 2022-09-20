import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import autoImport from 'sveltekit-autoimport';

import Unocss from 'unocss/vite'

const config: UserConfig = {
	plugins: [
		Unocss(),
		autoImport({
			components: ["./src/routes"]
		}),
		sveltekit(),
	]
};

export default config;
