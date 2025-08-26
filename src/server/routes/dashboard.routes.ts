import type { RouteContext } from '@maikdevries/server-router';
import { route } from '@maikdevries/server-router';

import type { BaseContext } from '../middleware/dashboard.middleware.ts';
import middleware from '../middleware/dashboard.middleware.ts';

import * as dashboard from '../controllers/dashboard.controllers.ts';

export type Context = RouteContext<BaseContext>;

const router = route<BaseContext>(
	[
		{
			'method': ['GET'],
			'pattern': new URLPattern({ 'pathname': '/dashboard/' }),
			'handler': dashboard.base,
		},
	],
	() => new Response('Not found', { 'status': 404 }),
);

export default middleware.add(router);
