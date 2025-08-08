import { render } from '@maikdevries/server-render';

export const Base = ((content: unknown) => render.html`
	<!DOCTYPE html>
	<html lang='en'>
		<head>
			<meta charset='UTF-8'>
			<meta name='viewport' content='width = device-width, initial-scale = 1.0'>
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
				<a href='https://maikdevries.com'>Maik de Vries</a>
			</footer>
		</body>
	</html>
`);
