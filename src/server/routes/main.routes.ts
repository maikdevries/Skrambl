import { route, type RouteContext } from '@maikdevries/server-router';
import { RouteError } from '@self/server/types';
import { type BaseContext as AC, middleware as authorised } from '../middleware/authorised.middleware.ts';
import { type BaseContext as CC, middleware as cached } from '../middleware/cached.middleware.ts';

import * as main from '../controllers/main.controllers.ts';

export type Context = RouteContext<AC & CC>;

const router = route<AC & CC>(
	[
		{
			'method': ['GET'],
			'pattern': new URLPattern({ 'pathname': '/' }),
			'handler': main.base,
		},
	],
	() => {
		throw new RouteError('resource_not_found');
	},
);

export default authorised.add(cached).add(router);
