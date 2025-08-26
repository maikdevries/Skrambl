import type { RouteContext } from '@maikdevries/server-router';
import { route } from '@maikdevries/server-router';

import type { BaseContext } from '../middleware/base.middleware.ts';
import middleware from '../middleware/base.middleware.ts';

import api from './api.routes.ts';
import auth from './auth.routes.ts';

import * as base from '../controllers/base.controllers.ts';

export type Context = RouteContext<BaseContext>;

const router = route<BaseContext>(
	[
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
			'method': ['GET'],
			'pattern': new URLPattern({ 'pathname': '/connect' }),
			'handler': base.connect,
		},
		{
			'method': ['GET'],
			'pattern': new URLPattern({ 'pathname': '/dashboard' }),
			'handler': base.dashboard,
		},
	],
	() => new Response('Not found', { 'status': 404 }),
);

export default middleware.add(router);
