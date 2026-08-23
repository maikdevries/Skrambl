import { route, type RouteContext } from '@disconnected/web-router';
import { RouteError } from '@self/server/types';
import { type BaseContext as AC, middleware as authorised } from '../middleware/authorised.middleware.ts';
import { type BaseContext as CC, middleware as cached } from '../middleware/cached.middleware.ts';

import * as pages from '../controllers/pages.controllers.ts';

export type Context = RouteContext<AC & CC>;

const router = route<AC & CC>(
	[
		{
			'method': ['GET'],
			'pattern': new URLPattern({ 'pathname': '/' }),
			'handler': pages.main,
		},
	],
	() => {
		throw new RouteError('resource_not_found');
	},
);

export default authorised.add(cached).add(router);
