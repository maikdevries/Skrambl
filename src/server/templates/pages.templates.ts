import { render } from '@maikdevries/server-render';

import { Base } from './base.templates.ts';
import { ListComponent } from './components.templates.ts';

export const Home = (() => Base(render.html`
	<section>
		${ ListComponent('Playlists', []) }
	</section>

	<aside>
		${ ListComponent('Queue', []) }
	</aside>
`));
