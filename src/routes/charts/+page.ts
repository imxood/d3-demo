import type { PageLoad } from './$types';

export const load: PageLoad = async (data) => {
    console.log(data);
    return {
        b: 1 * 2,
        c: 1,
    };
};