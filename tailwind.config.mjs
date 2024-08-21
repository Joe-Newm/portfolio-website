/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class', // Enable dark mode using the 'class' strategy
	theme: {
		extend: {
			colors: {
				light: '#f1f1f1', // Custom light mode color
				dark: '#1a1a1a', // Custom dark mode color
			},
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
			  },
		},
	},
	plugins: [],
};
