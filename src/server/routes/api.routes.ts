import { route, type RouteContext } from '@maikdevries/server-router';
import { type BaseContext as AC, middleware as authorised } from '../middleware/authorised.middleware.ts';
import { type BaseContext as CC, middleware as cached } from '../middleware/cached.middleware.ts';
import { RouteError } from './types.ts';

import * as api from '../controllers/api.controllers.ts';

export type Context = RouteContext<AC & CC>;

const router = route<AC & CC>(
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

export default authorised.add(cached).add(router);
