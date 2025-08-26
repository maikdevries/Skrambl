import type { Context } from '../routes/tool.routes.ts';

import { stringify as render } from '@maikdevries/server-render';
import * as templates from '../templates/pages.templates.ts';

export async function base(_: Request, __: Context): Promise<Response> {
	return new Response(await render(templates.Tool([])), {
		'headers': {
			'Content-Type': 'text/html; charset=utf-8',
		},
	});
}
