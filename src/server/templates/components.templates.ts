import type { Playlist } from '../types/base.types.ts';

import { html } from '@maikdevries/server-render';

// deno-fmt-ignore: Results in undesired formatting of template structure
export const ListComponent = ((heading: string, items: unknown[]) => html`
	<article class='list'>
		<header>
			<h2>${ heading }</h2>
		</header>

		<ul>
			${ items.map((x) => html`<li>${ x }</li>`) }
		</ul>
	</article>
`);

// deno-fmt-ignore: Results in undesired formatting of template structure
export const PlaylistComponent = (({ description, image, name, url }: Playlist) => html`
	<article class='playlist'>
		<img src='${ image }'>

		<span class='details'>
			<a href='${ url }'>${ name }</a>
			<span>${ description }</span>
		</span>
	</article>
`);
