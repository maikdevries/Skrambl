import type { Middleware } from '@maikdevries/server-router';
import { chain } from '@maikdevries/server-router';

import type { BaseContext as BC } from './base.middleware.ts';
import type { Credentials } from '../types/base.types.ts';

export interface BaseContext extends BC {
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

export default chain(authorised);
