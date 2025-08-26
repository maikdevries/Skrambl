import type { RouteContext } from '@maikdevries/server-router';
import { route } from '@maikdevries/server-router';

import type { BaseContext } from '../middleware/api.middleware.ts';
import middleware from '../middleware/api.middleware.ts';

export type Context = RouteContext<BaseContext>;

const router = route<BaseContext>(
	[
		{
			'method': ['GET'],
			'pattern': new URLPattern({ 'pathname': '/api/status' }),
			'handler': () => Response.json({ 'status': 'OK' }),
		},
	],
	() => Response.json({ 'description': 'The requested resource could not be found' }, { 'status': 404 }),
);

export default middleware.add(router);
