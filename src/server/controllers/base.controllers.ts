import type { Context } from '../routes/base.routes.ts';

import { stringify as render } from '@maikdevries/server-render';

import * as templates from '../templates/pages.templates.ts';

export async function connect(_: Request, __: Context): Promise<Response> {
	// [TODO] In case the user has already connected, redirect to the dashboard automatically
	return new Response(await render(templates.Connect()), {
		'headers': {
			'Content-Type': 'text/html; charset=utf-8',
		},
	});
}

export async function dashboard(_: Request, __: Context): Promise<Response> {
	return new Response(await render(templates.Dashboard([])), {
		'headers': {
			'Content-Type': 'text/html; charset=utf-8',
		},
	});
}
