import { chain, type Middleware } from '@maikdevries/server-middleware';
import { type Log, logger } from '@maikdevries/server-middleware/middleware';
import { stringify as render } from '@maikdevries/server-render';
import { middleware as session, type Session } from '@maikdevries/server-sessions';

import * as templates from '../templates/pages.templates.ts';
import { ServerError } from '../types/base.types.ts';

export interface BaseContext {
	'log': Log;
	'session': Session;
}

const error: Middleware = async (request, context, next) => {
	try {
		return next(request, context);
	} catch (error: unknown) {
		console.error(error);

		const code = error instanceof ServerError ? error.code === 500 ? 502 : error.code : 500;
		const description = ServerError.DESCRIPTIONS[code]
			?? 'Something went terribly wrong on our side of the internet';

		return new Response(await render(templates.Error(String(code), description)), {
			'status': code,
			'headers': {
				'Content-Type': 'text/html; charset=utf-8',
			},
		});
	}
};

export const middleware = chain(error).add(logger()).add(session());
