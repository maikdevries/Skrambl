import { chain, type Middleware } from '@maikdevries/server-middleware';
import { RouteError } from '@self/server/types';
import type { Credentials } from '../types/base.types.ts';
import type { BaseContext as BC } from './base.middleware.ts';

export interface BaseContext extends BC {
	'credentials': Credentials;
}

const authorised: Middleware<BC, { 'credentials': Credentials }> = (request, context, next) => {
	const credentials = context.session.get<Credentials>('credentials');
	if (!credentials) throw new RouteError('authorisation_missing');

	if (Temporal.Instant.compare(credentials.expires, Temporal.Now.instant()) <= 0) {
		throw new RouteError('authorisation_expired');
	}

	return next(request, { ...context, 'credentials': credentials });
};

export const middleware = chain(authorised);
