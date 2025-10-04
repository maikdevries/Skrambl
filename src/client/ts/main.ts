import { PlaylistElement } from './elements/playlist.elements.ts';

import type { ProgressElement } from './elements/progress.elements.ts';
import './elements/progress.elements.ts';

const [playlists, queue] = Array.from(document.querySelectorAll<HTMLUListElement>('main > section ul.base, main > aside ul.base'));
if (!playlists || !queue) throw new Error();

document.addEventListener(
	'playlist:button-click',
	((event: CustomEvent) => {
		const element = event.target instanceof PlaylistElement ? event.target.closest('ul.base > li') : null;
		if (!element) return;

		if (event.detail['operation'] === 'ADD') queue.append(element);
		else if (event.detail['operation'] === 'REMOVE') playlists.append(element);

		// [PATCH] Safari requires DOM manipulation to trigger CSS :has() pseudo-class reevaluation
		return queue.children.length ? delete queue.dataset['empty'] : queue.dataset['empty'] = 'true';
	}) as EventListener,
	{
		'passive': true,
	},
);

const progress = document.querySelector<ProgressElement>('x-progress');
const [stop, play] = Array.from(document.querySelectorAll<HTMLButtonElement>('main > aside > footer > button'));
if (!progress || !stop || !play) throw new Error();

// [TODO] Support for aborting ongoing operation
// stop.addEventListener('click', async (event: Event) => {});

play.addEventListener(
	'click',
	async (event: Event) => {
		const button = event.target instanceof Element ? event.target.closest('button') : null;
		if (!button) return;

		button.disabled = true;
		progress.percentage = 0;
		progress.state = 'PROCESSING';

		try {
			const items = Array.from(queue.querySelectorAll<PlaylistElement>('x-playlist')).map((x) => x.id);

			const response = await fetch(new URL('/api/process', document.location.origin), {
				'method': 'POST',
				'headers': {
					'Content-Type': 'application/json',
				},
				'body': JSON.stringify({
					'operation': 'SHUFFLE',
					'items': items,
				}),
			});

			if (!response.ok) throw new Error();

			progress.percentage = 100;
			progress.state = 'FINISHED';
		} catch (error: unknown) {
			// [TODO] Implement proper general error handler
			console.error(error);
			progress.state = 'ERROR';
		}

		button.disabled = false;
	},
	{
		'passive': true,
	},
);
