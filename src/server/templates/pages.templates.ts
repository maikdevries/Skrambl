import { render } from '@maikdevries/server-render';

import { Base } from './base.templates.ts';
import { List } from './components.templates.ts';

export const Home = (() => Base(render.html`
	<section>
		${ List('Playlists') }
	</section>

	<aside>
		${ List('Queue') }
	</aside>
`));
