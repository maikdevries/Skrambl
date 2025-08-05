import { route } from '@maikdevries/server-router';
import { session } from '@maikdevries/server-sessions';
import { STATUS_CODE, STATUS_TEXT } from '@std/http';

import * as auth from './controllers/auth.controllers.ts';
import * as spotify from './controllers/spotify.controllers.ts';

export default route(
	[
		{
			'method': ['GET'],
			'pattern': new URLPattern({ 'pathname': '/' }),
			'handler': (_, context) => new Response(`Welcome to ${context.url.hostname}`),
		},
		{
			'method': ['GET'],
			'pattern': new URLPattern({ 'pathname': '/auth/login' }),
			'handler': (request) => session.handle(request, auth.login),
		},
		{
			'method': ['GET'],
			'pattern': new URLPattern({ 'pathname': '/auth/process' }),
			'handler': (request) => session.handle(request, auth.process),
		},
		{
			'method': ['GET'],
			'pattern': new URLPattern({ 'pathname': '/auth/refresh' }),
			'handler': (request) => session.handle(request, auth.refresh),
		},
		{
			'method': ['GET'],
			'pattern': new URLPattern({ 'pathname': '/auth/logout' }),
			'handler': (request) => session.handle(request, auth.logout),
		},
		{
			'method': ['GET'],
			'pattern': new URLPattern({ 'pathname': '/playlists' }),
			'handler': (request) => session.handle(request, spotify.playlists),
		},
	],
	() => new Response(STATUS_TEXT[STATUS_CODE.NotFound], { 'status': STATUS_CODE.NotFound }),
);
