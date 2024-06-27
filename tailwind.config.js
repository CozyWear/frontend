const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Noto Sans"', ...defaultTheme.fontFamily.sans],
				serif: ['"Noto Serif"', ...defaultTheme.fontFamily.serif],
				mono: ['"Noto Sans Mono"', ...defaultTheme.fontFamily.mono]
			}
		}
	},
	plugins: []
};
