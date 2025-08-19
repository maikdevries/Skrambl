import type { Middleware } from '@maikdevries/server-router';
import type { Session } from '@maikdevries/server-sessions';

import { chain } from '@maikdevries/server-router';
import { session } from '@maikdevries/server-sessions';

export interface BaseContext {
	'session': Session;
}

const error: Middleware = async (request, context, next) => {
	try {
		return await next(request, context);
	} catch (error) {
		console.error(error);
		return new Response('Internal Server Error', { 'status': 500 });
	}
};

export default chain(error).add(session());
