import { chain, type Middleware } from '@maikdevries/server-middleware';

import type { BaseContext as BC } from './base.middleware.ts';
import type { Cache, Credentials } from '../types/base.types.ts';

export interface BaseContext extends BC {
	'cache': Cache;
	'credentials': Credentials;
}

const authorised: Middleware<BC & { 'url': URL }, { 'credentials': Credentials }> = (request, context, next) => {
	const credentials = context.session.get<Credentials>('credentials');
	if (!credentials) return Response.redirect(new URL('/auth/connect', context.url.origin));

	if (Temporal.Instant.compare(credentials.expires, Temporal.Now.instant()) <= 0) {
		return Response.redirect(new URL('/auth/refresh', context.url.origin));
	}

	return next(request, { ...context, 'credentials': credentials });
};

const cached: Middleware<BC & { 'url': URL }, { 'cache': Cache }> = (request, context, next) => {
	const cache = context.session.get<Cache>('cache');
	if (!cache) return Response.redirect(new URL('/cache/refresh', context.url.origin));

	return next(request, { ...context, 'cache': cache });
};

export const middleware = chain(authorised).add(cached);
