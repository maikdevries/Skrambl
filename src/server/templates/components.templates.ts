import { html } from '@maikdevries/server-render';

import * as icons from './icons.templates.ts';
import type { Playlist } from '../types/base.types.ts';

// deno-fmt-ignore: Results in undesired formatting of template structure
export const AnchorComponent = ((url: string, text: string) => html`
	<article class='anchor'>
		<a href='${ url }' target='_blank'>${ text }</a>
		${ icons.Link() }
	</article>
`);

// deno-fmt-ignore: Results in undesired formatting of template structure
export const BaseListComponent = ((items: unknown[]) => html`
	<ul class='base'>
		${ items.map((x) => html`<li class='ghost'>${ x }</li>`) }
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
export const PlaylistComponent = (({ id, description, image, name, url }: Playlist) => html`
	<x-playlist data-id='${ id }'>
		<img src='${ image.url }' width='${ image.size }' height='${ image.size }'>

		<span class='details'>
			${ AnchorComponent(url, name) }
			<span>${ description }</span>
		</span>

		<menu>
			<li>
				<button type='button' class='ghost' data-action='ADD'>${ icons.Add() }</button>
			</li>
			<li>
				<button type='button' class='danger ghost' data-action='REMOVE'>${ icons.Close() }</button>
			</li>
		</menu>
	</x-playlist>
`);
