import { PlaylistElement } from './elements/playlist.elements.ts';

const [playlists, queue] = Array.from(document.querySelectorAll('main > section ul.base, main > aside ul.base'));
if (!playlists || !queue) throw new Error();

document.addEventListener(
	'playlist:button-click',
	((event: CustomEvent) => {
		const element = event.target instanceof PlaylistElement ? event.target.closest('ul.base > li') : null;
		if (!element) return;

		if (event.detail['operation'] === 'ADD') return queue.append(element);
		else if (event.detail['operation'] === 'REMOVE') return playlists.append(element);
	}) as EventListener,
	{
		'passive': true,
	},
);

const [stop, play] = Array.from(document.querySelectorAll<HTMLButtonElement>('main > aside > footer > button'));
if (!stop || !play) throw new Error();

// [TODO] Support for aborting ongoing operation
// stop.addEventListener('click', async (event: Event) => {});

play.addEventListener(
	'click',
	async (event: Event) => {
		const button = event.target instanceof HTMLButtonElement ? event.target : null;
		if (!button) return;

		button.disabled = true;

		try {
			const items = Array.from(queue.querySelectorAll<PlaylistElement>('x-playlist')).map((x) => x.id);

			await fetch(new URL('/api/tool/process', document.location.origin), {
				'method': 'POST',
				'headers': {
					'Content-Type': 'application/json',
				},
				'body': JSON.stringify({
					'operation': 'SHUFFLE',
					'items': items,
				}),
			});
		} catch (error: unknown) {
			// [TODO] Implement proper general error handler
			console.error(error);
		}

		button.disabled = false;
	},
	{
		'passive': true,
	},
);
