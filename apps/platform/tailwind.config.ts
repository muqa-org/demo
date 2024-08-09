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
				primaryBlack: {
					DEFAULT: '#0B0B0B',
					dark: '#FFFFFF',
				},
				lightBlack: {
					DEFAULT: '#454545',
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
				grayLight: {
					DEFAULT: '#B0B0B0',
				},
			},
		},
		borderColor: {
			borderGray: '#D1D1D1',
			borderBlack: '#0B0B0B',
			lightGray: '#F6F6F6',
			lightBlue: '#579BEA',
		},
	},
	plugins: [],
};
export default config;
