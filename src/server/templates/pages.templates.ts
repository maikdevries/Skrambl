import type { Playlist } from '../common/types.ts';

import { html } from '@maikdevries/server-render';

import { Base } from './base.templates.ts';
import { ListComponent, PlaylistComponent } from './components.templates.ts';

export const Home = ((items: Playlist[]) => Base(html`
	<section>
		${ ListComponent('Playlists', items.map(PlaylistComponent)) }
	</section>

	<aside>
		${ ListComponent('Queue', []) }
	</aside>
`));
