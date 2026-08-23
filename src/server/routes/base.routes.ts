import { route, type RouteContext } from '@disconnected/web-router';
import { RouteError } from '@self/server/types';
import { type BaseContext, middleware } from '../middleware/base.middleware.ts';

import api from './api.routes.ts';
import auth from './auth.routes.ts';
import cache from './cache.routes.ts';
import pages from './pages.routes.ts';

export type Context = RouteContext<BaseContext>;

const router = route<BaseContext>(
	[
		// {
		// 	'method': ['GET'],
		// 	'pattern': new URLPattern({ 'pathname': '/status' }),
		// 	'handler': () => new Response('OK'),
		// },
		{
			'method': ['*'],
			'pattern': new URLPattern({ 'pathname': '/api/*' }),
			'handler': api,
		},
		{
			'method': ['*'],
			'pattern': new URLPattern({ 'pathname': '/auth/*' }),
			'handler': auth,
		},
		{
			'method': ['*'],
			'pattern': new URLPattern({ 'pathname': '/cache/*' }),
			'handler': cache,
		},
		// [NOTE] Top-level path router must be last to avoid 404's for other sub-level path routers
		{
			'method': '*',
			'pattern': new URLPattern({ 'pathname': '/*' }),
			'handler': pages,
		},
	],
	() => {
		throw new RouteError('resource_not_found');
	},
);

export default middleware.add(router);
