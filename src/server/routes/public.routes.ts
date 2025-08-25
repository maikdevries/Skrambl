import { route } from '@maikdevries/server-router';

import type { BaseContext } from '../middleware/base.middleware.ts';
import middleware from '../middleware/base.middleware.ts';

import auth from './auth.routes.ts';
import * as Page from '../templates/pages.templates.ts';

const router = route<BaseContext>(
	[
		{
			'method': ['*'],
			'pattern': new URLPattern({ 'pathname': '/auth/*' }),
			'handler': auth,
		},
		{
			'method': ['GET'],
			'pattern': new URLPattern({ 'pathname': '/connect' }),
			'handler': async (_, context) =>
				new Response(await context.render(Page.Connect()), {
					'headers': {
						'Content-Type': 'text/html; charset=utf-8',
					},
				}),
		},
	],
	() => new Response('Not found', { 'status': 404 }),
);

export default middleware.add(router);
