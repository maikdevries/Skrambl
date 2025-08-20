import type { RouteContext } from '@maikdevries/server-router';
import type { BaseContext } from '../middleware/base.middleware.ts';

import { route } from '@maikdevries/server-router';
import { STATUS_CODE, STATUS_TEXT } from '@std/http';

import middleware from '../middleware/base.middleware.ts';

import auth from './auth.routes.ts';

export type Context = RouteContext<BaseContext>;

const router = route<BaseContext>(
	[
		{
			'method': ['GET'],
			'pattern': new URLPattern({ 'pathname': '/auth/*' }),
			'handler': auth,
		},
	],
	() => new Response(STATUS_TEXT[STATUS_CODE.NotFound], { 'status': STATUS_CODE.NotFound }),
);

export default middleware.add(router);
