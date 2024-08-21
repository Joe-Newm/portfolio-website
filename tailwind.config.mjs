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
			keyframes: {
			'slide-up': {
        	'0%': { transform: 'translate(-50%, 100%)' },
        	'150%': { transform: 'translate(-50%, 0)' },
    		},
			},
			animation: {
			'slide-up': 'slide-up 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
			},
		},
	},
	plugins: [],
};
