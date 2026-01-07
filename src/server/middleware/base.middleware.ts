import type { Middleware } from '@maikdevries/server-router';
import { chain } from '@maikdevries/server-router';

import type { Session } from '@maikdevries/server-sessions';
import { session } from '@maikdevries/server-sessions';

import { stringify as render } from '@maikdevries/server-render';
import * as templates from '../templates/pages.templates.ts';

import { ServerError } from '../types/base.types.ts';

export interface BaseContext {
	'session': Session;
}

const error: Middleware = async (request, context, next) => {
	try {
		return await next(request, context);
	} catch (error: unknown) {
		console.error(error);

		const code = error instanceof ServerError ? error.code === 500 ? 502 : error.code : 500;
		const description = ServerError.DESCRIPTIONS[code] ?? 'Something went terribly wrong on our side of the internet';

		return new Response(await render(templates.Error(String(code), description)), {
			'status': code,
			'headers': {
				'Content-Type': 'text/html; charset=utf-8',
			},
		});
	}
};

const logger: Middleware = async (request, context, next) => {
	const start = performance.now();
	const response = await next(request, context);
	const end = performance.now();

	console.log(`[${(end - start).toFixed(2)} ms] ${request.method} ${request.url} - ${response.status}`);
	return response;
};

export default chain(error).add(logger).add(session());
