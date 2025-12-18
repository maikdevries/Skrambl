import type { Context } from '../routes/main.routes.ts';

import { stream as render } from '@maikdevries/server-render';

import * as templates from '../templates/pages.templates.ts';

export function base(_: Request, context: Context): Response {
	return new Response(render(templates.Main(context.cache.user, context.cache.playlists)), {
		'headers': {
			'Content-Type': 'text/html; charset=utf-8',
		},
	});
}
