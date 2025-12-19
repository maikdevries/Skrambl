import type { Middleware } from '@maikdevries/server-router';
import { chain } from '@maikdevries/server-router';

import type { BaseContext as BC } from './base.middleware.ts';

import type { Cache, Credentials } from '../types/base.types.ts';
import { ServerError } from '../types/base.types.ts';

export interface BaseContext extends BC {
	'cache': Cache;
	'credentials': Credentials;
}

const authorised: Middleware<BC, { 'credentials': Credentials }> = async (request, context, next) => {
	const credentials = context.session.get<Credentials>('credentials');
	if (!credentials) return Response.json({ 'description': 'The authorisation for this request is missing' }, { 'status': 401 });

	if (credentials.expires <= Date.now()) {
		return Response.json({ 'description': 'The authorisation for this request has expired' }, { 'status': 401 });
	}

	return await next(request, { ...context, 'credentials': credentials });
};

const cached: Middleware<BC, { 'cache': Cache }> = async (request, context, next) => {
	const cache = context.session.get<Cache>('cache');
	if (!cache) return Response.json({ 'description': 'Something went terribly wrong on our side of the internet' }, { 'status': 500 });

	return await next(request, { ...context, 'cache': cache });
};

const DESCRIPTIONS: { [code: number]: string } = {
	401: 'The authorisation for this request is missing or has expired',
	403: 'The authorisation for this request denies access to the requested resource',
	404: 'The requested resource could not be found',
	502: 'The server located upstream encountered a problem while handling this request',
	503: 'The server located upstream is currently unavailable',
};

const error: Middleware = async (request, context, next) => {
	try {
		return await next(request, context);
	} catch (error: unknown) {
		console.error(error);

		const code = error instanceof ServerError ? error.code === 500 ? 502 : error.code : 500;
		const description = DESCRIPTIONS[code] ?? 'Something went terribly wrong on our side of the internet';

		return Response.json({ 'description': description }, { 'status': code });
	}
};

export default chain(error).add(authorised).add(cached);
