import type { Context } from '../middleware/base.middleware.ts';

import * as templates from '../templates/pages.templates.ts';

export async function connect(_: Request, context: Context): Promise<Response> {
	// [TODO] In case the user has already connected, redirect to the dashboard automatically
	return new Response(await context.render(templates.Connect()), {
		'headers': {
			'Content-Type': 'text/html; charset=utf-8',
		},
	});
}

export async function dashboard(_: Request, context: Context): Promise<Response> {
	// [TODO] Enforce the user has already connected, else prompt for authorisation
	return new Response(await context.render(templates.Dashboard([])), {
		'headers': {
			'Content-Type': 'text/html; charset=utf-8',
		},
	});
}
