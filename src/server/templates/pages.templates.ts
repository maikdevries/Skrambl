import type { Playlist } from '../types/base.types.ts';

import { html } from '@maikdevries/server-render';

import { Base } from './base.templates.ts';
import { BaseListComponent, ListComponent, PlaylistComponent } from './components.templates.ts';
import * as icons from './icons.templates.ts';

// deno-fmt-ignore: Results in undesired formatting of template structure
export const Connect = (() => Base(
	[
		html`<link rel='stylesheet' href='/static/css/connect.css'>`,
	],
	html`
	<article class='dialog'>
		<header>
			<button type='button' class='ghost'>${ icons.Rewind() }</button>

			<h2>Connect a streaming service</h2>

			<button type='button' class='ghost'>${ icons.Close() }</button>
		</header>

		${
			BaseListComponent([
				html`<a href='/auth/setup' class='button spotify border surface'>Connect with Spotify</a>`,
			])
		}

		<footer>
			<article class='callout'>
				${ icons.Secure() }
				<p>
					<strong>Don't worry</strong>, none of your private information is ever shared with us.
				</p>
			</article>
		</footer>
	</article>
`));

// deno-fmt-ignore: Results in undesired formatting of template structure
export const Tool = ((items: Playlist[]) => Base(
	[
		html`<link rel='stylesheet' href='/static/css/tool.css'>`,
		html`<script type='module' src='/static/js/tool.js'></script>`,
	],
	html`
	<section>
		${ ListComponent('Playlists', items.map(PlaylistComponent)) }
	</section>

	<aside>
		${ ListComponent('Queue', []) }

		<footer>
			<button type='button' class='danger border surface' data-action='STOP' disabled>
				${ icons.Stop() }
				STOP
			</button>

			<button type='button' class='safe border surface' data-action='PLAY'>
				${ icons.Play() }
				PLAY
			</button>
		</footer>
	</aside>
`));
