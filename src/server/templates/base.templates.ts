import type { Template } from '@maikdevries/server-render';
import { html } from '@maikdevries/server-render';

import { AnchorComponent } from './components.templates.ts';

// deno-fmt-ignore: Results in undesired formatting of template structure
export const Base = ((imports: Template[], content: Template) => html`
	<!DOCTYPE html>
	<html lang='en'>
		<head>
			<meta charset='UTF-8'>
			<meta name='viewport' content='width = device-width, initial-scale = 1.0'>

			<link rel='stylesheet' href='/static/css/base.css'>
			${ imports }
		</head>

		<body>
			<header>
				<!-- [TODO] Define header template -->
			</header>

			<main>
				 ${ content }
			</main>

			<footer>
				&copy; 2025
				${ AnchorComponent('https://maikdevries.com', 'Maik de Vries') }
			</footer>
		</body>
	</html>
`);
