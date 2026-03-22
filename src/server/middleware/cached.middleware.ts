import { chain, type Middleware } from '@maikdevries/server-middleware';
import type { Cache } from '../types/base.types.ts';
import type { BaseContext as BC } from './base.middleware.ts';

export interface BaseContext extends BC {
	'cache': Cache;
}

const cached: Middleware<BC, { 'cache': Cache }> = (request, context, next) => {
	const cache = context.session.get<Cache>('cache');
	if (!cache) throw new Error();

	return next(request, { ...context, 'cache': cache });
};

export const middleware = chain(cached);
