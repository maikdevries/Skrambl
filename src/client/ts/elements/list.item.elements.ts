import { BaseElement } from './base.elements.ts';
import type { Comparable } from './list.elements.ts';

export class ListItemElement<T extends Element & Comparable<T>> extends BaseElement implements Comparable<ListItemElement<T>> {
	#content: T;
	#element: HTMLLIElement;

	constructor() {
		super({
			'events': {
				'type': ['click'],
			},
		});

		const content = this.slots.find((slot) => slot.name === 'content')?.firstElementChild as T;
		const element = this.root instanceof ShadowRoot ? this.root.host.closest('li') : this.root.closest('li');
		if (!content || !element) throw new Error();

		this.#content = content;
		this.#element = element;
	}

	get content(): T {
		return this.#content;
	}

	get element(): HTMLLIElement {
		return this.#element;
	}

	compare(other: ListItemElement<T>): number {
		return this.content.compare(other.content);
	}

	handleClick(event: PointerEvent): void {
		const button = event.target instanceof Element ? event.target.closest('button') : null;
		if (!button) return;

		this.emitEvent('list-item:action', {
			'action': button.dataset['action'],
		});
	}
}

self.customElements.define('x-list-item', ListItemElement);
