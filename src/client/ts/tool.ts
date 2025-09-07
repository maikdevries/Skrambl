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
);
