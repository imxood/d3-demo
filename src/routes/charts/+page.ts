export const prerender = false;

import type { PageLoad } from './$types';

export const load: PageLoad = async (data) => {
    console.log("data", data);
};