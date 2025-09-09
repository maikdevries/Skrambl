import type { RouteContext } from '@maikdevries/server-router';
import { route } from '@maikdevries/server-router';

import type { BaseContext } from '../middleware/base.middleware.ts';

import { ServerError } from '../types/base.types.ts';
import * as auth from '../controllers/auth.controllers.ts';

export type Context = RouteContext<BaseContext>;

const router = route<BaseContext>(
	[
		{
			'method': ['GET'],
			'pattern': new URLPattern({ 'pathname': '/auth/connect' }),
			'handler': auth.connect,
		},
		{
			'method': ['GET'],
			'pattern': new URLPattern({ 'pathname': '/auth/setup' }),
			'handler': auth.setup,
		},
		{
			'method': ['GET'],
			'pattern': new URLPattern({ 'pathname': '/auth/process' }),
			'handler': auth.process,
		},
		{
			'method': ['GET'],
			'pattern': new URLPattern({ 'pathname': '/auth/refresh' }),
			'handler': auth.refresh,
		},
		{
			'method': ['GET'],
			'pattern': new URLPattern({ 'pathname': '/auth/logout' }),
			'handler': auth.logout,
		},
	],
	(request, _) => {
		throw new ServerError(404, request.method, request.url);
	},
);

export default router;
