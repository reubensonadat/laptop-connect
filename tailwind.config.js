/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#2563eb',
          'blue-light': '#dbeafe',
        },
        secondary: {
          gray: '#6b7280',
        },
        background: {
          white: '#ffffff',
          'light-gray': '#f9fafb',
        },
        border: {
          gray: '#e5e7eb',
        },
        success: {
          green: '#10b981',
        },
        error: {
          red: '#ef4444',
        },
        warning: {
          yellow: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
      },
      boxShadow: {
        'small': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'large': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}