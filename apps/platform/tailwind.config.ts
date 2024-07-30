import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	safelist: [{ pattern: /bg-+/ }],

	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#0B0B0B',
					dark: '#FFFFFF',
				},
				blue: {
					DEFAULT: '#579BEA',
					dark: '#1E40AF',
				},
				gray: {
					DEFAULT: '#888888',
					dark: '#555555',
				},
				borderGray: '#D1D1D1',
			},
		},
	},
	plugins: [],
};
export default config;
