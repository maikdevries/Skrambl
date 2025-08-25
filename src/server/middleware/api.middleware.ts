import type { Middleware, RouteContext } from '@maikdevries/server-router';
import { chain } from '@maikdevries/server-router';

import type { Session } from '@maikdevries/server-sessions';
import { session } from '@maikdevries/server-sessions';

import type { Credentials } from '../types/base.types.ts';

export interface BaseContext {
	'credentials': Credentials;
	'session': Session;
}

export type Context = RouteContext<BaseContext>;

const authorised: Middleware<{ 'session': Session }, { 'credentials': Credentials }> = async (request, context, next) => {
	const credentials = context.session.get<Credentials>('credentials');
	if (!credentials) return Response.json({ 'description': 'The authorisation for this request is missing' }, { 'status': 401 });

	if (credentials.expires <= Date.now()) {
		return Response.json({ 'description': 'The authorisation for this request has expired' }, { 'status': 401 });
	}

	return await next(request, { ...context, 'credentials': credentials });
};

export default chain(session()).add(authorised);
