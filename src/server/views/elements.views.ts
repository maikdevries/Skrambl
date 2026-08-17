import { html, type Template } from '@maikdevries/server-render';

import * as icons from './icons.views.ts';
import type { Playlist } from '../types/base.types.ts';

export const AnchorElement = (url: string, text: string): Template =>
	html`
		<article class='anchor'>
			${icons.Link()}
			<a href='${url}' target='_blank'>${text}</a>
		</article>
	`;

export const BaseListElement = (items: unknown[] | Promise<unknown[]>): Template =>
	html`
		<ul class='base'>
			${items instanceof Promise
				? items.then((xs) => xs.map((x) => html`<li>${x}</li>`))
				: items.map((x) => html`<li>${x}</li>`)}
		</ul>
	`;

export const CalloutElement = (classes: string, icon: Template, heading: string, description: string): Template =>
	html`
		<article class='callout ${classes}'>
			<header>
				${icon}
				<h2>${heading}</h2>
			</header>

			<p>
				${description}
			</p>
		</article>
	`;

export const ListElement = (heading: string, items: unknown[] | Promise<unknown[]>): Template =>
	html`
		<x-list>
			<header>
				<h2>${heading}</h2>
			</header>

			${BaseListElement(
				items instanceof Promise ? items.then((xs) => xs.map(ListItemElement)) : items.map(ListItemElement),
			)}
		</x-list>
	`;

export const ListItemElement = (content: unknown): Template =>
	html`
		<x-list-item class='ghost'>
			<slot name='content'>${content}</slot>

			<menu>
				<li>
					<button type='button' class='ghost' data-action='ADD'>${icons.Add()}</button>
				</li>
				<li>
					<button type='button' class='ghost danger' data-action='REMOVE'>${icons.Close()}</button>
				</li>
			</menu>
		</x-list-item>
	`;

export const PlaylistElement = ({ id, description, image, name, supported, url }: Playlist): Template =>
	html`
		<x-playlist data-id='${id}' data-name='${name}' ${supported ? '' : 'disabled'}>
			<img src='${image.url}' width='${image.size}' height='${image.size}' loading='lazy'>

			<span class='details'>
				${AnchorElement(url, name)}
				<span>${description}</span>
			</span>

			${supported ? '' : html`<article class='badge surface warning'>Unsupported</article>`}
		</x-playlist>
	`;
