import { route, type RouteContext } from '@maikdevries/server-router';
import { type BaseContext, middleware } from '../middleware/main.middleware.ts';
import { RouteError } from './types.ts';

import * as main from '../controllers/main.controllers.ts';

export type Context = RouteContext<BaseContext>;

const router = route<BaseContext>(
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

export default middleware.add(router);
