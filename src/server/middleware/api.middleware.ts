import { chain, type Middleware } from '@maikdevries/server-middleware';
import type { BaseContext as BC } from './base.middleware.ts';
import type { Cache, Credentials } from '../types/base.types.ts';

export interface BaseContext extends BC {
	'cache': Cache;
	'credentials': Credentials;
}

const authorised: Middleware<BC, { 'credentials': Credentials }> = (request, context, next) => {
	const credentials = context.session.get<Credentials>('credentials');
	if (!credentials) {
		return Response.json({ 'description': 'The authorisation for this request is missing' }, { 'status': 401 });
	}

	if (Temporal.Instant.compare(credentials.expires, Temporal.Now.instant()) <= 0) {
		return Response.json({ 'description': 'The authorisation for this request has expired' }, { 'status': 401 });
	}

	return next(request, { ...context, 'credentials': credentials });
};

const cached: Middleware<BC, { 'cache': Cache }> = (request, context, next) => {
	const cache = context.session.get<Cache>('cache');
	if (!cache) {
		return Response.json({ 'description': 'Something went terribly wrong on our side of the internet' }, {
			'status': 500,
		});
	}

	return next(request, { ...context, 'cache': cache });
};

export const middleware = chain(authorised).add(cached);
