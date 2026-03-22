import { chain, type Middleware } from '@maikdevries/server-middleware';
import { type Log, logger } from '@maikdevries/server-middleware/middleware';
import { middleware as session, type Session } from '@maikdevries/server-sessions';

import { BaseError } from '@self/common/types';

export interface BaseContext {
	'log': Log;
	'session': Session;
}

const error: Middleware<{ 'log': Log }> = (request, context, next) => {
	try {
		return next(request, context);
	} catch (error: unknown) {
		// [NOTE] Unknown errors must be rethrown to force process to panic
		if (error instanceof BaseError === false) throw error;

		context.log.error = error.snippet;
		return Response.json(error.snippet, { 'status': error.snippet.status_code });
	}
};

export const middleware = chain(logger()).add(error).add(session());
