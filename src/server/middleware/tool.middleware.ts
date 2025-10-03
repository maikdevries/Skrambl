import type { Middleware } from '@maikdevries/server-router';
import { chain } from '@maikdevries/server-router';

import type { BaseContext as BC } from './base.middleware.ts';
import type { Credentials, User } from '../types/base.types.ts';

export interface BaseContext extends BC {
	'credentials': Credentials;
	'user': User;
}

const authorised: Middleware<BC & { 'url': URL }, { 'credentials': Credentials; 'user': User }> = async (request, context, next) => {
	const credentials = context.session.get<Credentials>('credentials');
	const user = context.session.get<User>('user');
	if (!credentials || !user) return Response.redirect(new URL('/auth/connect', context.url.origin));

	if (credentials.expires < Date.now()) return Response.redirect(new URL('/auth/refresh', context.url.origin));

	return await next(request, { ...context, 'credentials': credentials, 'user': user });
};

export default chain(authorised);
