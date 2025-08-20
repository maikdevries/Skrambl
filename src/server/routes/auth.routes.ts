import type { BaseContext } from '../middleware/base.middleware.ts';

import { route } from '@maikdevries/server-router';
import { STATUS_CODE, STATUS_TEXT } from '@std/http';

import * as auth from '../controllers/auth.controllers.ts';

const router = route<BaseContext>(
	[
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
	() => new Response(STATUS_TEXT[STATUS_CODE.NotFound], { 'status': STATUS_CODE.NotFound }),
);

export default router;
