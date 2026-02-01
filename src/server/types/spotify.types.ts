interface Base {
	'external_urls': {
		'spotify': string;
	};
	'href': string;
	'id': string;
	'uri': string;
}

interface BaseAlbum extends Base {
	'album_type': 'album' | 'compilation' | 'single';
	'artists': BaseArtist[];
	'available_markets': string[];
	'images': Image[];
	'name': string;
	'release_date': string;
	'release_date_precision': 'day' | 'month' | 'year';
	'total_tracks': number;
	'type': 'album';
}

interface BaseArtist extends Base {
	'name': string;
	'type': 'artist';
}

interface Copyright {
	'text': string;
	'type': 'C' | 'P';
}

interface Episode extends Base {
	'description': string;
	'duration_ms': number;
	'explicit': boolean;
	'html_description': string;
	'images': Image[];
	'is_externally_hosted': boolean;
	'languages': string[];
	'name': string;
	'release_date': string;
	'release_date_precision': string;
	'show': BaseShow;
	'type': 'episode';
}

interface Image {
	'height': number | null;
	'url': string;
	'width': number | null;
}

export interface BasePlaylist extends Base {
	'collaborative': boolean;
	'description': string;
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
}

export interface PlaylistItem {
	'added_at': string | null;
	'added_by': BaseUser | null;
	'is_local': boolean;
	'track': Episode | Track;
}

interface BaseShow extends Base {
	'available_markets': string[];
	'copyrights': Copyright[];
	'description': string;
	'explicit': boolean;
	'html_description': string;
	'images': Image[];
	'is_externally_hosted': boolean;
	'languages': string[];
	'media_type': string;
	'name': string;
	'publisher': string;
	'total_episodes': number;
	'type': 'show';
}

export interface Snapshot {
	'snapshot_id': string;
}

interface Track extends Base {
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
	'is_local': boolean;
	'name': string;
	'popularity': number;
	'track_number': number;
	'type': 'track';
}

interface BaseUser extends Base {
	'type': 'user';
}

interface User extends BaseUser {
	'display_name': string | null;
}

export interface UserProfile extends User {
	'followers': {
		'href': string | null;
		'total': number;
	};
	'images': Image[];
}
