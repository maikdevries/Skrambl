import { BaseElement } from './base.elements.ts';

export class PlaylistElement extends BaseElement {
	#id = '';
	#name = '';

	constructor() {
		super({
			'events': {
				'type': ['click'],
			},
		});
	}

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

	handleClick(event: PointerEvent): void {
		const button = event.target instanceof Element ? event.target.closest('button') : null;
		if (!button) return;

		this.emitEvent('playlist:button-click', {
			'operation': button.dataset['action'],
		});
	}
}

self.customElements.define('x-playlist', PlaylistElement);
