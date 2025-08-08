import { render } from '@maikdevries/server-render';

import { Base } from './base.templates.ts';

export const Home = (() => Base(render.html`
	<section>
		<!-- [TODO] Define list template for playlists -->
	</section>

	<aside>
		<!-- [TODO] Define list template for selected playlists -->
	</aside>
`));
