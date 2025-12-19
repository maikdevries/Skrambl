import type { Context } from '../routes/cache.routes.ts';

import type { Cache } from '../types/base.types.ts';

import * as spotify from '../services/spotify.services.ts';

export async function refresh(_: Request, context: Context): Promise<Response> {
	const user = await spotify.getUser(context.credentials.token);
	const playlists = spotify.getPlaylists(context.credentials.token, user.id);

	context.session.set<Cache>('cache', {
		'playlists': playlists,
		'tracks': new Map(),
		'user': user,
	});

	return Response.redirect(new URL('/', context.url.origin));
}
