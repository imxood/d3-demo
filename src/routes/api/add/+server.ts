import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// /** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const { a, b } = await request.json();
    return json(a + b);
}