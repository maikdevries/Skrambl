import type { RouteContext } from '@maikdevries/server-router';
import { route } from '@maikdevries/server-router';

import type { BaseContext } from '../middleware/main.middleware.ts';
import middleware from '../middleware/main.middleware.ts';

import { ServerError } from '../types/base.types.ts';
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
	(request, _) => {
		throw new ServerError(404, request.method, request.url);
	},
);

export default middleware.add(router);
