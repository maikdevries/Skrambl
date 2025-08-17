import { render } from '@maikdevries/server-render';

export const ListComponent = ((heading: string, items: unknown[]) => render.html`
	<article class='list'>
		<header>
			<h2>${ heading }</h2>
		</header>

		<ul>
			${ items.map((x) => render.html`<li>${ x }</li>`) }
		</ul>
	</article>
`);

export const PlaylistComponent = ((description: string, image: string, name: string, url: string) => render.html`
	<article class='playlist'>
		<img src='${ image }'>

		<span class='details'>
			<a href='${ url }'>${ name }</a>
			<span>${ description }</span>
		</span>
	</article>
`);
