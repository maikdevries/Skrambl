import { html } from '@maikdevries/server-render';

import * as icons from './icons.templates.ts';
import type { Playlist } from '../types/base.types.ts';

// deno-fmt-ignore: Results in undesired formatting of template structure
export const AnchorComponent = ((url: string, text: string) => html`
	<article class='anchor'>
		<a href='${ url }'>${ text }</a>
		${ icons.Link() }
	</article>
`);

// deno-fmt-ignore: Results in undesired formatting of template structure
export const BaseListComponent = ((items: unknown[]) => html`
	<ul class='base'>
		${ items.map((x) => html`<li>${ x }</li>`) }
	</ul>
`);

// deno-fmt-ignore: Results in undesired formatting of template structure
export const ListComponent = ((heading: string, items: unknown[]) => html`
	<article class='list'>
		<header>
			<h2>${ heading }</h2>
		</header>

		${ BaseListComponent(items) }
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
