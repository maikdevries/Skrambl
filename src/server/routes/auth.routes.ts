import { route, type RouteContext } from '@maikdevries/server-router';
import type { BaseContext } from '../middleware/base.middleware.ts';
import { RouteError } from './types.ts';

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
			'pattern': new URLPattern({ 'pathname': '/auth/csrf' }),
			'handler': auth.csrf,
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
	() => {
		throw new RouteError('resource_not_found');
	},
);

export default router;
