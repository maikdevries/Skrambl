import { BaseElement } from './base.elements.ts';
import type { Comparable } from './list.elements.ts';

export class PlaylistElement extends BaseElement implements Comparable<PlaylistElement> {
	#id = '';
	#name = '';

	override get id(): string {
		return this.#id;
	}

	get name(): string {
		return this.#name;
	}

	override init(): boolean {
		if (!super.init()) return false;

		this.#id = this.dataset['id'] ?? '';
		this.#name = this.dataset['name'] ?? '';

		return this.initialised = true;
	}

	compare(other: PlaylistElement): number {
		return this.name.localeCompare(other.name);
	}
}

self.customElements.define('x-playlist', PlaylistElement);
