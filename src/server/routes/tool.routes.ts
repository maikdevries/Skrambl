import type { RouteContext } from '@maikdevries/server-router';
import { route } from '@maikdevries/server-router';

import type { BaseContext } from '../middleware/tool.middleware.ts';
import middleware from '../middleware/tool.middleware.ts';

import * as tool from '../controllers/tool.controllers.ts';

export type Context = RouteContext<BaseContext>;

const router = route<BaseContext>(
	[
		{
			'method': ['GET'],
			'pattern': new URLPattern({ 'pathname': '/tool/' }),
			'handler': tool.base,
		},
	],
	() => new Response('Not found', { 'status': 404 }),
);

export default middleware.add(router);
