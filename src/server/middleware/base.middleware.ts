import type { Template } from '@maikdevries/server-render';
import type { Empty, Middleware, RouteContext } from '@maikdevries/server-router';
import type { Session } from '@maikdevries/server-sessions';

import { stringify } from '@maikdevries/server-render';
import { chain } from '@maikdevries/server-router';
import { session } from '@maikdevries/server-sessions';

export interface BaseContext {
	'render': (template: Template) => Promise<string>;
	'session': Session;
}

export type Context = RouteContext<BaseContext>;

const error: Middleware = async (request, context, next) => {
	try {
		return await next(request, context);
	} catch (error) {
		console.error(error);
		return new Response('Internal Server Error', { 'status': 500 });
	}
};

const render: Middleware<Empty, { 'render': BaseContext['render'] }> = async (request, context, next) => {
	return await next(request, {
		...context,
		'render': stringify,
	});
};

export default chain(error).add(render).add(session());
