import type { Playlist } from '../types/base.types.ts';

import { html } from '@maikdevries/server-render';

import { Base } from './base.templates.ts';
import { AnchorComponent, BaseListComponent, CalloutComponent, ListComponent, PlaylistComponent } from './components.templates.ts';
import * as icons from './icons.templates.ts';

// deno-fmt-ignore: Results in undesired formatting of template structure
export const Connect = (() => Base('Connect',
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
			${
				CalloutComponent(
					'safe surface',
					icons.Secure(),
					'Privacy',
					"Don't worry, none of your private information is ever shared with us"
				)
			}
		</footer>
	</article>
`));

// deno-fmt-ignore: Results in undesired formatting of template structure
export const Error = ((name: string, description: string) => Base('Error',
	[
		html`<link rel='stylesheet' href='/static/css/error.css'>`,
	],
	html`
	${
		CalloutComponent(
			'danger border surface',
			icons.Error(),
			name,
			description,
		)
	}

	<section>
		If you keep finding your way back to this place, consider
		${ AnchorComponent('mailto:support@maikdevries.com', 'sending an email') } for support
	</section>
`));

// deno-fmt-ignore: Results in undesired formatting of template structure
export const Tool = ((items: Playlist[]) => Base('Tool',
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
			<x-progress data-state='HIDDEN'>
				<header>
					<span><slot name='state'></slot></span>
					<span><slot name='percentage'></slot>%</span>
				</header>

				<progress class='surface' max='100'></progress>
			</x-progress>

			<button type='button' class='danger border surface' data-action='STOP' hidden>
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
