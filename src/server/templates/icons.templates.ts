import { html } from '@maikdevries/server-render';

// deno-fmt-ignore: Results in undesired formatting of template structure
export const Add = (() => html`
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960' width='24' height='24' fill='currentColor'>
		<path d='M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z'/>
	</svg>
`);

// deno-fmt-ignore: Results in undesired formatting of template structure
export const Close = (() => html`
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960' width='24' height='24' fill='currentColor'>
		<path d='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z'/>
	</svg>
`);

// deno-fmt-ignore: Results in undesired formatting of template structure
export const Error = (() => html`
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960' width='24' height='24' fill='currentColor'>
		<path d='M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z'/>
	</svg>
`);

// deno-fmt-ignore: Results in undesired formatting of template structure
export const Link = (() => html`
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2'>
		<path d='M9.16488 17.6505C8.92513 17.8743 8.73958 18.0241 8.54996 18.1336C7.62175 18.6695 6.47816 18.6695 5.54996 18.1336C5.20791 17.9361 4.87912 17.6073 4.22153 16.9498C3.56394 16.2922 3.23514 15.9634 3.03767 15.6213C2.50177 14.6931 2.50177 13.5495 3.03767 12.6213C3.23514 12.2793 3.56394 11.9505 4.22153 11.2929L7.04996 8.46448C7.70755 7.80689 8.03634 7.47809 8.37838 7.28062C9.30659 6.74472 10.4502 6.74472 11.3784 7.28061C11.7204 7.47809 12.0492 7.80689 12.7068 8.46448C13.3644 9.12207 13.6932 9.45086 13.8907 9.7929C14.4266 10.7211 14.4266 11.8647 13.8907 12.7929C13.7812 12.9825 13.6314 13.1681 13.4075 13.4078M10.5919 10.5922C10.368 10.8319 10.2182 11.0175 10.1087 11.2071C9.57284 12.1353 9.57284 13.2789 10.1087 14.2071C10.3062 14.5492 10.635 14.878 11.2926 15.5355C11.9502 16.1931 12.279 16.5219 12.621 16.7194C13.5492 17.2553 14.6928 17.2553 15.621 16.7194C15.9631 16.5219 16.2919 16.1931 16.9495 15.5355L19.7779 12.7071C20.4355 12.0495 20.7643 11.7207 20.9617 11.3787C21.4976 10.4505 21.4976 9.30689 20.9617 8.37869C20.7643 8.03665 20.4355 7.70785 19.7779 7.05026C19.1203 6.39267 18.7915 6.06388 18.4495 5.8664C17.5212 5.3305 16.3777 5.3305 15.4495 5.8664C15.2598 5.97588 15.0743 6.12571 14.8345 6.34955'/>
	</svg>
`);

// deno-fmt-ignore: Results in undesired formatting of template structure
export const Play = (() => html`
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960' width='24' height='24' fill='currentColor'>
		<path d='M320-200v-560l440 280-440 280Z'/>
	</svg>
`);

// deno-fmt-ignore: Results in undesired formatting of template structure
export const Rewind = (() => html`
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960' width='24' height='24' fill='currentColor'>
		<path d='M220-240v-480h80v480h-80Zm520 0L380-480l360-240v480Zm-80-240Zm0 90v-180l-136 90 136 90Z'/>
	</svg>
`);

// deno-fmt-ignore: Results in undesired formatting of template structure
export const Secure = (() => html`
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960' width='24' height='24' fill='currentColor'>
		<path d='M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z'/>
	</svg>
`);

// deno-fmt-ignore: Results in undesired formatting of template structure
export const Signout = (() => html`
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960' width='24' height='24' fill='currentColor'>
		<path d='M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z'/>
	</svg>
`);

// deno-fmt-ignore: Results in undesired formatting of template structure
export const Stop = (() => html`
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960' width='24' height='24' fill='currentColor'>
		<path d='M240-240v-480h480v480H240Z'/>
	</svg>
`);
