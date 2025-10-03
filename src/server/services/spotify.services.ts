import type { Playlist } from '../types/base.types.ts';
import type { BasePlaylist, PlaylistItem, Snapshot, UserProfile } from '../types/spotify.types.ts';

import * as fetch from '../controllers/fetch.controllers.ts';

export async function getPlaylists(token: string, owner: string): Promise<Playlist[]> {
	const items = await fetch.pull<BasePlaylist>(token, 'GET', 'me/playlists');

	return items.map((x) => ({
		'id': x.id,
		'description': x.description,
		'image': {
			'size': x.images?.at(0)?.width ?? 0,
			'url': x.images?.at(0)?.url ?? '',
		},
		'name': x.name,
		'supported': x.owner.id === owner,
		'url': x.external_urls.spotify,
	}));
}

export async function addPlaylistItems(token: string, id: string, tracks: PlaylistItem[]): Promise<Snapshot> {
	return await fetch.push<Snapshot>(token, 'POST', `playlists/${id}/tracks`, 'uris', tracks.map((x) => x.track.uri));
}

export async function getPlaylistItems(token: string, id: string): Promise<PlaylistItem[]> {
	const items = await fetch.pull<PlaylistItem>(token, 'GET', `playlists/${id}/tracks`);

	// [NOTE] Operations on local files are not (fully) supported
	return items.filter((x) => x.is_local === false);
}

export async function removePlaylistItems(token: string, id: string, tracks: PlaylistItem[]): Promise<Snapshot> {
	return await fetch.push<Snapshot>(token, 'DELETE', `playlists/${id}/tracks`, 'tracks', tracks.map((x) => ({ 'uri': x.track.uri })));
}

export async function getUser(token: string): Promise<UserProfile> {
	return await fetch.api<UserProfile>(token, 'GET', 'me');
}
