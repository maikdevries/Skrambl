import type { Context } from '../routes/auth.routes.ts';
import type { Credentials, User } from '../types/base.types.ts';

import * as auth from '../services/auth.services.ts';

import { stringify as render } from '@maikdevries/server-render';
import * as templates from '../templates/pages.templates.ts';

interface PKCE {
	'state': string;
	'verifier': string;
}

const BASE64_OPTIONS = { 'alphabet': 'base64url', 'omitPadding': true };

export async function connect(_: Request, context: Context): Promise<Response> {
	// [TODO] In case the user has already connected, redirect to the main page automatically
	return new Response(await render(templates.Connect(context.session.get<User>('user'))), {
		'headers': {
			'Content-Type': 'text/html; charset=utf-8',
		},
	});
}

export async function csrf(_: Request, __: Context): Promise<Response> {
	return new Response(await render(templates.Error('CSRF', 'Someone might have tried to tamper with your connection')), {
		'headers': {
			'Content-Type': 'text/html; charset=utf-8',
		},
	});
}

export async function setup(_: Request, context: Context): Promise<Response> {
	const state = crypto.getRandomValues(new Uint8Array(128)).toBase64(BASE64_OPTIONS);

	const verifier = crypto.getRandomValues(new Uint8Array(96)).toBase64(BASE64_OPTIONS);
	const challenge = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier))).toBase64(BASE64_OPTIONS);

	const params = new URLSearchParams({
		'client_id': Deno.env.get('SPOTIFY_CLIENT_ID') ?? '',
		'response_type': 'code',
		'redirect_uri': `${context.url.origin}/auth/process`,
		'state': state,
		'scope': 'playlist-modify-private playlist-modify-public playlist-read-private',
		'code_challenge_method': 'S256',
		'code_challenge': challenge,
	});

	context.session.flash('pkce', {
		'state': state,
		'verifier': verifier,
	});

	return Response.redirect(`https://accounts.spotify.com/authorize?${params}`);
}

export async function process(_: Request, context: Context): Promise<Response> {
	const code = context.url.searchParams.get('code');
	const pkce = context.session.get<PKCE>('pkce');

	if (!code || !pkce) return Response.redirect(new URL('/auth/connect', context.url.origin));
	else if (context.url.searchParams.get('state') !== pkce.state) return Response.redirect(new URL('/auth/csrf', context.url.origin));

	const credentials = await auth.retrieve(code, pkce.verifier, context.url.origin);
	context.session.regenerate().set('credentials', credentials);

	return Response.redirect(new URL('/', context.url.origin));
}

export async function refresh(_: Request, context: Context): Promise<Response> {
	const token = context.session.get<Credentials>('credentials')?.refresh;
	if (!token) return Response.redirect(new URL('/auth/connect', context.url.origin));

	const credentials = await auth.refresh(token);
	context.session.regenerate().set('credentials', credentials);

	return Response.redirect(new URL('/', context.url.origin));
}

export function logout(_: Request, context: Context): Response {
	context.session.terminate();

	return Response.redirect(new URL('/', context.url.origin));
}
