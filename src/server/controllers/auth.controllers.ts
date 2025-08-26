import type { Context } from '../middleware/base.middleware.ts';
import type { Credentials } from '../types/base.types.ts';

import { encodeBase64Url } from '@std/encoding';
import * as auth from '../services/auth.services.ts';

interface PKCE {
	'state': string;
	'verifier': string;
}

export async function setup(_: Request, context: Context): Promise<Response> {
	// [FUTURE] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/toBase64#browser_compatibility
	const state = encodeBase64Url(crypto.getRandomValues(new Uint8Array(128)));

	// [FUTURE] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/toBase64#browser_compatibility
	const verifier = encodeBase64Url(crypto.getRandomValues(new Uint8Array(96)));
	const challenge = encodeBase64Url(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier)));

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

	if (!code || !pkce) return Response.redirect(new URL('/connect', context.url.origin));
	else if (context.url.searchParams.get('state') !== pkce.state) return Response.redirect(new URL('/auth/csrf', context.url.origin));

	const credentials = await auth.retrieve(code, pkce.verifier, context.url.origin);
	context.session.regenerate().set('credentials', credentials);

	return Response.redirect(new URL('/dashboard', context.url.origin));
}

export async function refresh(_: Request, context: Context): Promise<Response> {
	const token = context.session.get<Credentials>('credentials')?.refresh;
	if (!token) return Response.redirect(new URL('/connect', context.url.origin));

	const credentials = await auth.refresh(token);
	context.session.regenerate().set('credentials', credentials);

	return Response.redirect(new URL('/', context.url.origin));
}

export function logout(_: Request, context: Context): Response {
	context.session.terminate();

	return Response.redirect(new URL('/', context.url.origin));
}
