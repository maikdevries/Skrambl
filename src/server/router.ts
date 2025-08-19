import type { RouteContext } from '@maikdevries/server-router';
import type { Session } from '@maikdevries/server-sessions';

import { route } from '@maikdevries/server-router';
import { STATUS_CODE, STATUS_TEXT } from '@std/http';

import * as auth from './controllers/auth.controllers.ts';
import * as spotify from './controllers/spotify.controllers.ts';

import middleware from './middleware/base.middleware.ts';

export type Context = RouteContext<{ 'session': Session }>;

const router = route<{ 'session': Session }>(
	[
		{
			'method': ['GET'],
			'pattern': new URLPattern({ 'pathname': '/' }),
			'handler': (_, context) => new Response(`Welcome to ${context.url.hostname}`),
		},
		{
			'method': ['GET'],
			'pattern': new URLPattern({ 'pathname': '/auth/login' }),
			'handler': auth.login,
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
		{
			'method': ['GET'],
			'pattern': new URLPattern({ 'pathname': '/playlists' }),
			'handler': spotify.playlists,
		},
	],
	() => new Response(STATUS_TEXT[STATUS_CODE.NotFound], { 'status': STATUS_CODE.NotFound }),
);

export default middleware.add(router);
