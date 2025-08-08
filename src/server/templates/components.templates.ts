import { render } from '@maikdevries/server-render';

export const List = ((heading: string, items: unknown[]) => render.html`
	<article class='list'>
		<header>
			<h2>${ heading }</h2>
		</header>

		<ul>
			${ items.map((x) => render.html`<li>${ x }</li>`) }
		</ul>
	</article>
`);
