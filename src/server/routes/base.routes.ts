import type { RouteContext } from '@maikdevries/server-router';
import { route } from '@maikdevries/server-router';

import type { BaseContext } from '../middleware/base.middleware.ts';
import middleware from '../middleware/base.middleware.ts';

import { ServerError } from '../types/base.types.ts';

import api from './api.routes.ts';
import auth from './auth.routes.ts';
import main from './main.routes.ts';

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
			'method': ['*'],
			'pattern': new URLPattern({ 'pathname': '/*' }),
			'handler': main,
		},
	],
	(request, _) => {
		throw new ServerError(404, request.method, request.url);
	},
);

export default middleware.add(router);
