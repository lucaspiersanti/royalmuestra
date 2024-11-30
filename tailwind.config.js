/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				royal: '#0C1835',
				decorativo: '#B08848',
				resaltar: '#6D7743',
			},
			screens: {
				sm: '640px',
				// => @media (min-width: 640px) { ... }

				md: '790px',
				// => @media (min-width: 768px) { ... }

				lg: '1024px',
				// => @media (min-width: 1024px) { ... }

				xl: '1280px',
				// => @media (min-width: 1280px) { ... }

				'2xl': '1536px',
				// => @media (min-width: 1536px) { ... }
			},
		},
	},
	plugins: [],
};
