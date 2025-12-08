import type { Context } from '../routes/cache.routes.ts';

import * as spotify from '../services/spotify.services.ts';

export async function refresh(_: Request, context: Context): Promise<Response> {
	const user = await spotify.getUser(context.credentials.token);

	context.session.set('cache', {
		'user': user,
	});

	return Response.redirect(new URL('/', context.url.origin));
}
