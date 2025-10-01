// [FUTURE] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with#browser_compatibility
// import styles from './../../css/base.css' with { 'type': 'css' };

interface ElementOptions {
	'encapsulate': boolean;
	'events': {
		'type': string[];
	};
}

export class BaseElement extends HTMLElement {
	static observedAttributes = [];
	#options: ElementOptions;

	// [FUTURE] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with#browser_compatibility
	static #style: () => Node;
	static {
		const style = document.createElement('link');
		style.rel = 'stylesheet';
		style.href = '/static/css/base.css';

		this.#style = () => style.cloneNode();
	}

	#initialised = false;
	#internals: ElementInternals;
	#shadow: ShadowRoot | null;

	#root: HTMLElement | ShadowRoot;
	#slots: HTMLSlotElement[];

	constructor(options: ElementOptions) {
		super();
		this.#options = options;

		this.#internals = this.attachInternals();
		this.#shadow = this.#internals.shadowRoot ?? this.#options.encapsulate ? this.attachShadow({ 'mode': 'open' }) : null;

		// [FUTURE] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with#browser_compatibility
		// this.#shadow.adoptedStyleSheets = [styles];
		this.#shadow?.prepend(BaseElement.#style());

		this.#root = this.#options.encapsulate ? this.#shadow ?? this : this;
		this.#slots = Array.from(this.#root.querySelectorAll('slot'));
	}

	set initialised(state: boolean) {
		this.#initialised = state;
	}

	get root(): HTMLElement | ShadowRoot {
		return this.#root;
	}

	get slots(): HTMLSlotElement[] {
		return this.#slots;
	}

	connectedCallback(): void {
		if (document.readyState !== 'loading') this.init();
		else document.addEventListener('DOMContentLoaded', () => this.init(), { 'once': true });
	}

	disconnectedCallback(): void {
		for (const type of this.#options.events.type) this.#root.removeEventListener(type, this);
		this.#initialised = false;
	}

	// adoptedCallback(): void {}
	// attributeChangedCallback(attribute, previous, current): void {}

	// [FUTURE] https://developer.mozilla.org/en-US/docs/Web/API/Element/moveBefore#browser_compatibility
	// connectedMoveCallback(): void {}

	init(): boolean {
		if (this.#initialised) return false;

		for (const type of this.#options.events.type) this.#root.addEventListener(type, this);
		return true;
	}

	emitEvent(type: string, detail: unknown): boolean {
		return this.dispatchEvent(
			new CustomEvent(type, {
				'bubbles': true,
				'cancelable': false,
				'composed': false,
				'detail': detail,
			}),
		);
	}

	handleEvent(event: Event): void {
		// @ts-expect-error: Unable to properly type runtime-dependent event type handlers
		this[`handle${event.type[0]?.toUpperCase() + event.type.slice(1)}`](event);
	}
}
