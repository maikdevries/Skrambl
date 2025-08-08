import { render } from '@maikdevries/server-render';

export const List = ((heading: string) => render.html`
	<article class='list'>
		<header>
			<h2>${ heading }</h2>
		</header>

		<ul>
			<!-- [TODO] Support insertion of list elements -->
		</ul>
	</article>
`);
