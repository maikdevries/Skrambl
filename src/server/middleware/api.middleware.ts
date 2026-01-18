import type { Middleware } from '@maikdevries/server-middleware';
import { chain } from '@maikdevries/server-middleware';

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

const error: Middleware = async (request, context, next) => {
	try {
		return await next(request, context);
	} catch (error: unknown) {
		console.error(error);

		const code = error instanceof ServerError ? error.code === 500 ? 502 : error.code : 500;
		const description = ServerError.DESCRIPTIONS[code] ?? 'Something went terribly wrong on our side of the internet';

		return Response.json({ 'description': description }, { 'status': code });
	}
};

export default chain(error).add(authorised).add(cached);
