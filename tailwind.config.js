/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  "./pages/**/*.{js,jsx}",
	  "./components/**/*.{js,jsx}",
	  "./app/**/*.{js,jsx}",
	  "./src/**/*.{js,jsx}",
	  "*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
	  extend: {
		colors: {
		  border: "hsl(var(--border))",
		  input: "hsl(var(--input))",
		  ring: "hsl(var(--ring))",
		  background: "hsl(var(--background))",
		  foreground: "hsl(var(--foreground))",
		  primary: {
			DEFAULT: "hsl(var(--primary))",
			foreground: "hsl(var(--primary-foreground))",
		  },
		  secondary: {
			DEFAULT: "hsl(var(--secondary))",
			foreground: "hsl(var(--secondary-foreground))",
		  },
		  destructive: {
			DEFAULT: "hsl(var(--destructive))",
			foreground: "hsl(var(--destructive-foreground))",
		  },
		  muted: {
			DEFAULT: "hsl(var(--muted))",
			foreground: "hsl(var(--muted-foreground))",
		  },
		  accent: {
			DEFAULT: "hsl(var(--accent))",
			foreground: "hsl(var(--accent-foreground))",
		  },
		  popover: {
			DEFAULT: "hsl(var(--popover))",
			foreground: "hsl(var(--popover-foreground))",
		  },
		  card: {
			DEFAULT: "hsl(var(--card))",
			foreground: "hsl(var(--card-foreground))",
		  },
		},
		keyframes: {
		  "aurora-drift-1": {
			"0%, 100%": { transform: "translate(0%, 0%) rotate(0deg)" },
			"33%": { transform: "translate(2%, 1%) rotate(1deg)" },
			"66%": { transform: "translate(-1%, 2%) rotate(-1deg)" },
		  },
		  "aurora-drift-2": {
			"0%, 100%": { transform: "translate(0%, 0%) rotate(0deg)" },
			"33%": { transform: "translate(-2%, -1%) rotate(-1deg)" },
			"66%": { transform: "translate(1%, -2%) rotate(1deg)" },
		  },
		},
		animation: {
		  "aurora-drift-1": "aurora-drift-1 15s ease-in-out infinite",
		  "aurora-drift-2": "aurora-drift-2 18s ease-in-out infinite reverse",
		},
	  },
	},
	plugins: [],
  }
  
  