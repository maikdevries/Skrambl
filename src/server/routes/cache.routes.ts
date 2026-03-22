import { route, type RouteContext } from '@maikdevries/server-router';
import { RouteError } from '@self/server/types';
import { type BaseContext, middleware } from '../middleware/authorised.middleware.ts';

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
	() => {
		throw new RouteError('resource_not_found');
	},
);

export default middleware.add(router);
