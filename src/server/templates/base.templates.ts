import type { Template } from '@maikdevries/server-render';
import { html } from '@maikdevries/server-render';

import type { User } from '../types/base.types.ts';

import { AnchorComponent, BaseListComponent } from './components.templates.ts';
import * as icons from './icons.templates.ts';

// deno-fmt-ignore: Results in undesired formatting of template structure
export const Base = ((title: string, imports: Template[], user: User | undefined, content: Template) => html`
	<!DOCTYPE html>
	<html lang='en'>
		<head>
			<meta charset='UTF-8'>
			<meta name='viewport' content='width = device-width, initial-scale = 1.0'>

			<title>${ title } | Skrambl.</title>

			<link rel='preconnect' href='https://rsms.me'>
			<link rel='stylesheet' href='https://rsms.me/inter/inter.css'>

			<link rel='stylesheet' href='/static/css/base.css'>
			${ imports }
		</head>

		<body>
			<header>
				<div>
					<h1>Skrambl.</h1>
					<article class='badge border surface warning'>Early Access</article>
				</div>

				${
					!user ? '' : html`
						<article class='user'>
							<button type='button' class='ghost' popovertarget='dropdown'>
								<img src='${ user.image.url }' width='${ user.image.size }' height='${ user.image.size }'>
							</button>

							<section id='dropdown' popover='auto'>
								<section class='details'>
									<img src='${ user.image.url }' width='${ user.image.size }' height='${ user.image.size }'>
									${ user.name }
								</section>

								<hr>

								${
									BaseListComponent([
										html`<a href='/auth/logout' class='button surface danger'>${ icons.Signout() } Sign out</a>`,
									])
								}
							</section>
						</article>
					`
				}
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
