interface BaseAlbum {
	'album_type': 'album' | 'compilation' | 'single';
	'artists': BaseArtist[];
	'available_markets': string[];
	'external_urls': {
		'spotify': string;
	};
	'href': string;
	'id': string;
	'images': Image[];
	'name': string;
	'release_date': string;
	'release_date_precision': 'day' | 'month' | 'year';
	'total_tracks': number;
	'type': 'album';
	'uri': string;
}

interface BaseArtist {
	'external_urls': {
		'spotify': string;
	};
	'href': string;
	'id': string;
	'name': string;
	'type': 'artist';
	'uri': string;
}

interface Copyright {
	'text': string;
	'type': 'C' | 'P';
}

interface Episode {
	'description': string;
	'duration_ms': number;
	'explicit': boolean;
	'external_urls': {
		'spotify': string;
	};
	'href': string;
	'html_description': string;
	'id': string;
	'images': Image[];
	'is_externally_hosted': boolean;
	'languages': string[];
	'name': string;
	'release_date': string;
	'release_date_precision': string;
	'show': BaseShow;
	'type': 'episode';
	'uri': string;
}

interface Image {
	'height': number | null;
	'url': string;
	'width': number | null;
}

export interface BasePlaylist {
	'collaborative': boolean;
	'description': string;
	'external_urls': {
		'spotify': string;
	};
	'href': string;
	'id': string;
	'images': Image[] | null;
	'name': string;
	'owner': User;
	'public': boolean;
	'snapshot_id': string;
	'tracks': {
		'href': string;
		'total': number;
	};
	'type': 'playlist';
	'uri': string;
}

export interface PlaylistItem {
	'added_at': string | null;
	'added_by': BaseUser | null;
	'is_local': boolean;
	'track': Episode | Track;
}

interface BaseShow {
	'available_markets': string[];
	'copyrights': Copyright[];
	'description': string;
	'explicit': boolean;
	'external_urls': {
		'spotify': string;
	};
	'href': string;
	'html_description': string;
	'id': string;
	'images': Image[];
	'is_externally_hosted': boolean;
	'languages': string[];
	'media_type': string;
	'name': string;
	'publisher': string;
	'total_episodes': number;
	'type': 'show';
	'uri': string;
}

export interface Snapshot {
	'snapshot_id': string;
}

interface Track {
	'album': BaseAlbum;
	'artists': BaseArtist[];
	'available_markets': string[];
	'disc_number': number;
	'duration_ms': number;
	'explicit': boolean;
	'external_ids': {
		'isrc': string;
		'ean': string;
		'upc': string;
	};
	'external_urls': {
		'spotify': string;
	};
	'href': string;
	'id': string;
	'is_local': boolean;
	'name': string;
	'popularity': number;
	'track_number': number;
	'type': 'track';
	'uri': string;
}

interface BaseUser {
	'external_urls': {
		'spotify': string;
	};
	'href': string;
	'id': string;
	'type': 'user';
	'uri': string;
}

export interface User extends BaseUser {
	'display_name': string | null;
}
