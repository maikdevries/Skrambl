import { route, type RouteContext } from '@maikdevries/server-router';
import { type BaseContext, middleware } from '../middleware/api.middleware.ts';
import { RouteError } from './types.ts';

import * as api from '../controllers/api.controllers.ts';

export type Context = RouteContext<BaseContext>;

const router = route<BaseContext>(
	[
		{
			'method': ['POST'],
			'pattern': new URLPattern({ 'pathname': '/api/process' }),
			'handler': api.process,
		},
	],
	() => {
		throw new RouteError('resource_not_found');
	},
);

export default middleware.add(router);
