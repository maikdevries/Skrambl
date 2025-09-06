import type { Middleware } from '@maikdevries/server-router';
import { chain } from '@maikdevries/server-router';

import type { Session } from '@maikdevries/server-sessions';
import { session } from '@maikdevries/server-sessions';

export interface BaseContext {
	'session': Session;
}

const logger: Middleware = async (request, context, next) => {
	const start = performance.now();
	const response = await next(request, context);
	const end = performance.now();

	console.log(`[${(end - start).toFixed(2)} ms] ${request.method} ${request.url} - ${response.status}`);
	return response;
};

export default chain(logger).add(session());
