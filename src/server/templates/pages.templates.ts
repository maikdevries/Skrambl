import type { Playlist } from '../types/base.types.ts';

import { html } from '@maikdevries/server-render';

import { Base } from './base.templates.ts';
import { ListComponent, PlaylistComponent } from './components.templates.ts';

// deno-fmt-ignore: Results in undesired formatting of template structure
export const Connect = (() => Base(
	[
		html`<link rel='stylesheet' href='/static/css/connect.css'>`,
	],
	html`
	<section>
		${
			ListComponent('Plug into a streaming service', [
				html`<a href='/auth/setup'>Connect with Spotify</a>`,
			])
		}

		<footer>
			<strong>Don't worry</strong>, none of your private information is ever shared with us.
		</footer>
	</section>
`));

// deno-fmt-ignore: Results in undesired formatting of template structure
export const Tool = ((items: Playlist[]) => Base(
	[
		html`<link rel='stylesheet' href='/static/css/tool.css'>`,
	],
	html`
	<section>
		${ ListComponent('Playlists', items.map(PlaylistComponent)) }
	</section>

	<aside>
		${ ListComponent('Queue', []) }
	</aside>
`));
