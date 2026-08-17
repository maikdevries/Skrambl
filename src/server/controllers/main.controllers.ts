import { stream as render } from '@maikdevries/server-render';
import type { Context } from '../routes/main.routes.ts';

import * as views from '../views/pages.views.ts';

export function base(_: Request, context: Context): Response {
	return new Response(render(views.Main(context.cache.user, context.cache.playlists)), {
		'headers': {
			'Content-Type': 'text/html; charset=utf-8',
		},
	});
}
