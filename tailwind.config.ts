
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(217 91% 60%)',
					foreground: 'hsl(0 0% 98%)',
					50: 'hsl(217 100% 97%)',
					100: 'hsl(217 96% 94%)',
					200: 'hsl(217 96% 87%)',
					300: 'hsl(217 96% 78%)',
					400: 'hsl(217 96% 69%)',
					500: 'hsl(217 91% 60%)',
					600: 'hsl(217 84% 53%)',
					700: 'hsl(217 77% 47%)',
					800: 'hsl(217 71% 39%)',
					900: 'hsl(217 89% 20%)',
				},
				secondary: {
					DEFAULT: 'hsl(210 40% 96.1%)',
					foreground: 'hsl(222.2 47.4% 11.2%)'
				},
				destructive: {
					DEFAULT: 'hsl(0 84.2% 60.2%)',
					foreground: 'hsl(210 40% 98%)'
				},
				muted: {
					DEFAULT: 'hsl(210 40% 96.1%)',
					foreground: 'hsl(215.4 16.3% 46.9%)'
				},
				accent: {
					DEFAULT: 'hsl(210 40% 96.1%)',
					foreground: 'hsl(222.2 47.4% 11.2%)'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(217 89% 20%)',
					foreground: 'hsl(0 0% 98%)',
					primary: 'hsl(217 91% 60%)',
					'primary-foreground': 'hsl(0 0% 100%)',
					accent: 'hsl(217 77% 47%)',
					'accent-foreground': 'hsl(0 0% 98%)',
					border: 'hsl(217 71% 39%)',
					ring: 'hsl(217 91% 60%)'
				},
				garapa: {
					blue: 'hsl(217 91% 60%)',
					'blue-dark': 'hsl(217 89% 20%)',
					'blue-light': 'hsl(217 96% 94%)',
					gray: 'hsl(215 25% 27%)',
					'gray-light': 'hsl(220 13% 91%)',
					success: 'hsl(142 71% 45%)',
					warning: 'hsl(38 92% 50%)',
					error: 'hsl(0 84% 60%)',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in': 'slide-in 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
