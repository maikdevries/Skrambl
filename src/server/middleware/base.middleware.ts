import { chain, type Middleware } from '@maikdevries/server-middleware';
import { type Log, logger } from '@maikdevries/server-middleware/middleware';
import { middleware as session, type Session } from '@maikdevries/server-sessions';
import { BaseError, type ErrorDetails } from '@self/common/types';

export interface BaseContext {
	'log': Log;
	'session': Session;
}

const error: Middleware<{ 'log': Log }> = (request, context, next) => {
	try {
		return next(request, context);
	} catch (error: unknown) {
		const details: ErrorDetails = error instanceof BaseError ? error.details : {
			'message': 'Something went terribly wrong on our side of the internet',
			'reason': 'internal_server_error',
			'retriable': false,
			'status_code': 500,
			'type': Error.name,
		};

		context.log.error = details;
		return Response.json(details, { 'status': details.status_code });
	}
};

export const middleware = chain(logger()).add(error).add(session());
