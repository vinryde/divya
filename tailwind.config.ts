import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	screens: {
  		sm: '320px',
  		md: '768px',
  		lg: '1024px',
  		xl: '1280px'
  	},
  	extend: {
  		fontFamily: {
  			sans: [
  				'Mona Sans',
  				'serif'
  			]
  		},
  		colors: {
  			primary: '#0D0E09',
  			primaryWhite: '#ffffff',
  			darkOrange: '#FA481C',
  			darkBlue: '#5765FB',
  			darkYellow: '#FCD100',
  			lightYellow: '#DED1C1',
  			darkColor: '#0C0C0C',
  			darkGray: '#262626',
  			brand: 'hsl(var(--brand))',
  			'brand-foreground': 'hsl(var(--brand-foreground))'
  		},
  		keyframes: {
  			appear: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(10px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'appear-zoom': {
  				'0%': {
  					opacity: '0',
  					transform: 'scale(0.95)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'scale(1)'
  				}
  			},
  			'skew-scroll': {
  				'0%': {
  					transform: 'rotateX(20deg) rotateZ(-20deg) skewX(20deg)'
  				},
  				'100%': {
  					transform: 'rotateX(20deg) rotateZ(-20deg) skewX(20deg) translateY(-500%)'
  				}
  			}
  		},
  		animation: {
  			appear: 'appear 0.5s ease-out forwards',
  			'appear-zoom': 'appear-zoom 0.5s ease-out forwards',
  			'skew-scroll': 'skew-scroll 20s linear infinite'
  		}
  	}
  },
  plugins: [],
} satisfies Config;
