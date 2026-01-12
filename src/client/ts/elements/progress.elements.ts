import { BaseElement } from './base.elements.ts';

export class ProgressElement extends BaseElement {
	#element: HTMLProgressElement;
	#percentage: HTMLSlotElement;
	#state: HTMLSlotElement;

	constructor() {
		super();

		const element = this.root.querySelector('progress');
		const [state, percentage] = this.slots.filter((x) => x.name === 'state' || x.name === 'percentage');
		if (!element || !state || !percentage) throw new Error();

		this.#element = element;
		this.#percentage = percentage;
		this.#state = state;
	}

	set percentage(p: number) {
		this.#element.value = p;
		this.#percentage.textContent = String(p);
	}

	set state(s: 'ERROR' | 'FINISHED' | 'HIDDEN' | 'PROCESSING') {
		this.dataset['state'] = s;
		this.#state.textContent = s;
	}

	override init(): boolean {
		if (!super.init()) return false;

		this.percentage = Number.parseInt(this.dataset['percentage'] ?? '0');
		this.state = this.dataset['state'] as 'ERROR' | 'FINISHED' | 'HIDDEN' | 'PROCESSING' ?? 'HIDDEN';

		return this.initialised = true;
	}
}

self.customElements.define('x-progress', ProgressElement);
