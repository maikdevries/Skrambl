import type { Context } from '../routes/api.routes.ts';

import { ServerError } from '../types/base.types.ts';
import * as spotify from '../services/spotify.services.ts';

const OPERATIONS = {
	'SHUFFLE': shuffle,
};

export async function process(request: Request, context: Context): Promise<Response> {
	// [TODO] Proper validation whether request body is JSON and has 'operation' (string) and 'items' (string[]) properties
	const { operation, items }: { 'operation': keyof typeof OPERATIONS; 'items': string[] } = await request.json();

	const promises = items.map(async (id) => {
		const tracks = context.cache.tracks.get(id) ?? await spotify.getPlaylistItems(context.credentials.token, id);
		if (!tracks.length) return;

		// [NOTE] Create cache entry for current playlist to avoid loss of data when error is thrown hereafter
		if (!context.cache.tracks.has(id)) context.cache.tracks.set(id, tracks);

		await spotify.removePlaylistItems(context.credentials.token, id, tracks);
		await spotify.addPlaylistItems(context.credentials.token, id, OPERATIONS[operation](tracks));

		// [NOTE] When successful, clear cache from current playlist
		return context.cache.tracks.delete(id);
	});

	const results = await Promise.allSettled(promises);

	if (results.every((x) => x.status === 'fulfilled')) {
		return Response.json({ 'description': 'The operation has been processed successfully' });
	} else throw new ServerError(500, request.method, request.url);
}

// [NOTE] Durstenfeld variant of the Fisher-Yates shuffle algorithm
function shuffle<T>(array: T[]): T[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]] as [T, T];
	}

	return array;
}
