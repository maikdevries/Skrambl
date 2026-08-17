export interface Cache {
	'allowed': Promise<Set<Playlist['id']>>;
	'playlists': Promise<Playlist[]>;
	'tracks': Map<Playlist['id'], Track[]>;
	'user': User;
}

export interface Credentials {
	'expires': Temporal.Instant;
	'refresh': string;
	'token': string;
}

export interface Playlist {
	'id': string;
	'description': string;
	'image': {
		'size': number;
		'url': string;
	};
	'name': string;
	'supported': boolean;
	'url': string;
}

export interface Track {
	'uri': string;
}

export interface User {
	'id': string;
	'image': {
		'size': number;
		'url': string;
	};
	'name': string;
}
