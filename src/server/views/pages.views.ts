import { html, type Template } from '@maikdevries/server-render';

import { Base } from './base.views.ts';
import * as elements from './elements.views.ts';
import * as icons from './icons.views.ts';
import type { Playlist, User } from '../types/base.types.ts';

export const Connect = (user: User | undefined): Template =>
	Base(
		'Connect',
		[
			html`<link rel='stylesheet' href='/static/css/pages/connect.css'>`,
		],
		user,
		html`
			<article class='dialog'>
				<header>
					<button type='button' class='ghost'>${icons.Rewind()}</button>

					<h2>Connect a streaming service</h2>

					<button type='button' class='ghost'>${icons.Close()}</button>
				</header>

				${elements.BaseListElement([
					html`<a href='/auth/setup' class='button border surface spotify'>Connect with Spotify</a>`,
				])}

				<footer>
					${elements.CalloutElement(
						'surface safe',
						icons.Secure(),
						'Privacy',
						"Don't worry, none of your private information is ever shared with us",
					)}
				</footer>
			</article>
		`,
	);

export const Error = (name: string, description: string): Template =>
	Base(
		'Error',
		[
			html`<link rel='stylesheet' href='/static/css/pages/error.css'>`,
		],
		undefined,
		html`
			${elements.CalloutElement(
				'border surface danger',
				icons.Error(),
				name,
				description,
			)}

			<section>
				If you keep finding your way back to this place, consider
				${elements.AnchorElement('mailto:support@maikdevries.com', 'sending an email')} for support
			</section>
		`,
	);

export const Main = (user: User, items: Promise<Playlist[]>): Template =>
	Base(
		user.name,
		[
			html`<link rel='stylesheet' href='/static/css/pages/main.css'>`,
			html`<script type='module' src='/static/js/pages/main.js'></script>`,
		],
		user,
		html`
			<section>
				${elements.ListElement('Playlists', items.then((xs) => xs.map(elements.PlaylistElement)))}
			</section>

			<aside>
				${elements.ListElement('Queue', [])}

				<footer>
					<x-progress data-state='HIDDEN'>
						<header>
							<span><slot name='state'></slot></span>
							<span><slot name='percentage'></slot>%</span>
						</header>

						<progress class='surface' max='100'></progress>
					</x-progress>

					<button type='button' class='border surface danger' data-action='STOP' hidden>
						${icons.Stop()}
						STOP
					</button>

					<button type='button' class='border surface safe' data-action='PLAY' disabled>
						${icons.Play()}
						PLAY
					</button>
				</footer>
			</aside>
		`,
	);
