import type { Context } from '../routes/tool.routes.ts';

import { stringify as render } from '@maikdevries/server-render';

import * as spotify from '../services/spotify.services.ts';
import * as templates from '../templates/pages.templates.ts';

export async function base(_: Request, context: Context): Promise<Response> {
	const playlists = await spotify.getPlaylists(context.credentials.token);

	return new Response(await render(templates.Tool(playlists)), {
		'headers': {
			'Content-Type': 'text/html; charset=utf-8',
		},
	});
}
