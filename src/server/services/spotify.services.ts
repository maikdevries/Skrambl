import type { Playlist } from '../types/base.types.ts';
import type { BasePlaylist, PlaylistItem, Snapshot } from '../types/spotify.types.ts';

import * as fetch from '../common/fetch.ts';

export async function getPlaylists(token: string): Promise<Playlist[]> {
	const items = await fetch.pull<BasePlaylist>(token, 'GET', 'me/playlists');

	return items.map((x) => ({
		'description': x.description,
		'image': x.images?.at(0)?.url ?? '',
		'name': x.name,
		'url': x.external_urls.spotify,
	}));
}

export async function addPlaylistItems(token: string, id: string, tracks: PlaylistItem[]): Promise<Snapshot> {
	return await fetch.push<Snapshot>(token, 'POST', `playlists/${id}/tracks`, 'uris', tracks.map((x) => x.track.uri));
}

export async function getPlaylistItems(token: string, id: string): Promise<PlaylistItem[]> {
	return await fetch.pull<PlaylistItem>(token, 'GET', `playlists/${id}/tracks`);
}

export async function removePlaylistItems(token: string, id: string, tracks: PlaylistItem[]): Promise<Snapshot> {
	return await fetch.push<Snapshot>(token, 'DELETE', `playlists/${id}/tracks`, 'tracks', tracks.map((x) => ({ 'uri': x.track.uri })));
}
