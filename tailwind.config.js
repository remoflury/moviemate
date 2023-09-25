/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			transparent: 'transparent',
			black: '#0C011A',
			white: '#FDFFFC',
			gray: {
				dark: '#707070',
				light: '#A0A0A0'
			},
			primary: '#2EC4B6',
			green: '#2DB722',
			red: '#e02e27'
		},
		fontFamily: {
			body: ['Manrope', 'sans-serif'],
			heading: ['Outfit', 'sans-serif']
		},
		extend: {
			container: {
				center: true,
				padding: {
					DEFAULT: '1.5rem'
				}
			},
			borderRadius: {
				max: '100vmax', 
			},
			minHeight: {
				screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],

			}
		}
	},
	plugins: []
};
