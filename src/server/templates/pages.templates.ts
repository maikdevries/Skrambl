import { html } from '@maikdevries/server-render';

import { Base } from './base.templates.ts';
import * as components from './components.templates.ts';
import * as icons from './icons.templates.ts';
import type { Playlist, User } from '../types/base.types.ts';

// deno-fmt-ignore: Results in undesired formatting of template structure
export const Connect = ((user: User | undefined) => Base('Connect',
	[
		html`<link rel='stylesheet' href='/static/css/connect.css'>`,
	],
	user,
	html`
	<article class='dialog'>
		<header>
			<button type='button' class='ghost'>${ icons.Rewind() }</button>

			<h2>Connect a streaming service</h2>

			<button type='button' class='ghost'>${ icons.Close() }</button>
		</header>

		${
			components.BaseListComponent([
				html`<a href='/auth/setup' class='button border surface spotify'>Connect with Spotify</a>`,
			])
		}

		<footer>
			${
				components.CalloutComponent(
					'surface safe',
					icons.Secure(),
					'Privacy',
					"Don't worry, none of your private information is ever shared with us",
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
	undefined,
	html`
	${
		components.CalloutComponent(
			'border surface danger',
			icons.Error(),
			name,
			description,
		)
	}

	<section>
		If you keep finding your way back to this place, consider
		${ components.AnchorComponent('mailto:support@maikdevries.com', 'sending an email') } for support
	</section>
`));

// deno-fmt-ignore: Results in undesired formatting of template structure
export const Main = ((user: User, items: Promise<Playlist[]>) => Base(user.name,
	[
		html`<link rel='stylesheet' href='/static/css/main.css'>`,
		html`<script type='module' src='/static/js/main.js'></script>`,
	],
	user,
	html`
	<section>
		${ components.ListComponent('Playlists', items.then((xs) => xs.map(components.PlaylistComponent))) }
	</section>

	<aside>
		${ components.ListComponent('Queue', []) }

		<footer>
			<x-progress data-state='HIDDEN'>
				<header>
					<span><slot name='state'></slot></span>
					<span><slot name='percentage'></slot>%</span>
				</header>

				<progress class='surface' max='100'></progress>
			</x-progress>

			<button type='button' class='border surface danger' data-action='STOP' hidden>
				${ icons.Stop() }
				STOP
			</button>

			<button type='button' class='border surface safe' data-action='PLAY' disabled>
				${ icons.Play() }
				PLAY
			</button>
		</footer>
	</aside>
`));
