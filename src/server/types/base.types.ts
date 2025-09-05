export interface Credentials {
	'expires': number;
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
	'url': string;
}
