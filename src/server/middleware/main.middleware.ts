import type { Middleware } from '@maikdevries/server-router';
import { chain } from '@maikdevries/server-router';

import type { BaseContext as BC } from './base.middleware.ts';
import type { Cache, Credentials } from '../types/base.types.ts';

export interface BaseContext extends BC {
	'cache': Cache;
	'credentials': Credentials;
}

const authorised: Middleware<BC & { 'url': URL }, { 'credentials': Credentials }> = async (request, context, next) => {
	const credentials = context.session.get<Credentials>('credentials');
	if (!credentials) return Response.redirect(new URL('/auth/connect', context.url.origin));

	if (credentials.expires <= Date.now()) return Response.redirect(new URL('/auth/refresh', context.url.origin));

	return await next(request, { ...context, 'credentials': credentials });
};

const cached: Middleware<BC & { 'url': URL }, { 'cache': Cache }> = async (request, context, next) => {
	const cache = context.session.get<Cache>('cache');
	if (!cache) return Response.redirect(new URL('/cache/refresh', context.url.origin));

	return await next(request, { ...context, 'cache': cache });
};

export default chain(authorised).add(cached);
