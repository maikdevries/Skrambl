import { render } from '@maikdevries/server-render';

export const Base = (() => render.html`
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
				<!-- [TODO] Support insertion of main content -->
			</main>

			<footer>
				<!-- [TODO] Define footer template -->
			</footer>
		</body>
	</html>
`);
