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
				grayDark: {
					DEFAULT: '#4A4A4A',
				},
				green: {
					DEFAULT: '#39A56A',
				},
				progressLow: {
					DEFAULT: '#C9767B',
				},
				progressMedium: {
					DEFAULT: '#E2CB55',
				},
				progressHigh: {
					DEFAULT: '#09CE78',
				},
			},
		},
		borderColor: {
			borderGreen: '#39A56A',
			borderGreenDark: '#126F3C',
			borderGray: '#D1D1D1',
			borderGrayMedium: '#B4B4B4',
			borderGrayLight: '#DDDDDD',
			borderBlack: '#0B0B0B',
			lightGray: '#F6F6F6',
			lightBlue: '#579BEA',
			white: '#FFFFFF',
		},
	},
	plugins: [],
};
export default config;
