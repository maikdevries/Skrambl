import type { Playlist } from '../common/types.ts';

import { html } from '@maikdevries/server-render';

import { Base } from './base.templates.ts';
import { ListComponent, PlaylistComponent } from './components.templates.ts';

export const Authorisation = (() => Base(html`
	<section>
		${
			ListComponent('Plug into a streaming service', [
				html`<a href='/auth/login'>Connect with Spotify</a>`,
			])
		}

		<footer>
			<strong>Don't worry</strong>, none of your private information is ever shared with us.
		</footer>
	</section>
`));

export const Dashboard = ((items: Playlist[]) => Base(html`
	<section>
		${ ListComponent('Playlists', items.map(PlaylistComponent)) }
	</section>

	<aside>
		${ ListComponent('Queue', []) }
	</aside>
`));
