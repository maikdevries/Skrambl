import type { RouteContext } from '@maikdevries/server-router';
import { route } from '@maikdevries/server-router';

import type { BaseContext } from '../middleware/api.middleware.ts';
import middleware from '../middleware/api.middleware.ts';

import { ServerError } from '../types/base.types.ts';
import * as api from '../controllers/api.controllers.ts';

export type Context = RouteContext<BaseContext>;

const router = route<BaseContext>(
	[
		{
			'method': ['GET'],
			'pattern': new URLPattern({ 'pathname': '/api/status' }),
			'handler': () => Response.json({ 'status': 'OK' }),
		},
		{
			'method': ['POST'],
			'pattern': new URLPattern({ 'pathname': '/api/process' }),
			'handler': api.process,
		},
	],
	(request, _) => {
		throw new ServerError(404, request.method, request.url);
	},
);

export default middleware.add(router);
