import type { Context } from '../routes/main.routes.ts';

import { stringify as render } from '@maikdevries/server-render';

import * as templates from '../templates/pages.templates.ts';

export async function base(_: Request, context: Context): Promise<Response> {
	return new Response(await render(templates.Main(context.cache.user, context.cache.playlists)), {
		'headers': {
			'Content-Type': 'text/html; charset=utf-8',
		},
	});
}
