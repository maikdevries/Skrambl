import type { PlaylistElement } from './playlist.elements.ts';
import { BaseElement } from './base.elements.ts';

export class ListElement extends BaseElement {
	#element: HTMLUListElement;
	#items: HTMLCollectionOf<PlaylistElement>;
	#observer: MutationObserver;

	constructor() {
		super({
			'encapsulate': false,
			'events': {
				'type': [],
			},
		});

		const element = this.root.querySelector<HTMLUListElement>('ul.base');
		if (!element) throw new Error();

		this.#element = element;
		this.#items = this.#element.getElementsByTagName('x-playlist') as HTMLCollectionOf<PlaylistElement>;
		this.#observer = new MutationObserver(() => this.render());
	}

	get items(): PlaylistElement[] {
		return Array.from(this.#items);
	}

	get list(): HTMLUListElement {
		return this.#element;
	}

	override init(): boolean {
		if (!super.init()) return false;

		this.#observer.observe(this.#element, { 'childList': true });

		// [NOTE] Enqueue render call at the end of the task queue to ensure elements have been initialised
		setTimeout(() => this.render());

		return this.initialised = true;
	}

	override disconnectedCallback(): void {
		this.#observer.disconnect();
		return super.disconnectedCallback();
	}

	render(): void {
		this.#items.length ? this.states.delete('empty') : this.states.add('empty');
	}
}

self.customElements.define('x-list', ListElement);
