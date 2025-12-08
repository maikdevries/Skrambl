import type { RouteContext } from '@maikdevries/server-router';
import { route } from '@maikdevries/server-router';

import type { BaseContext } from '../middleware/cache.middleware.ts';
import middleware from '../middleware/cache.middleware.ts';

import { ServerError } from '../types/base.types.ts';
import * as cache from '../controllers/cache.controllers.ts';

export type Context = RouteContext<BaseContext>;

const router = route<BaseContext>(
	[
		{
			'method': ['GET'],
			'pattern': new URLPattern({ 'pathname': '/cache/refresh' }),
			'handler': cache.refresh,
		},
	],
	(request, _) => {
		throw new ServerError(404, request.method, request.url);
	},
);

export default middleware.add(router);
