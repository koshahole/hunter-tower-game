/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arcade: ['"Russo One"', '"Bungee"', 'Impact', '"Arial Black"', '-apple-system', 'sans-serif'],
        display: ['"Russo One"', '"Bungee"', 'Impact', '"Arial Black"', '-apple-system', 'sans-serif'],
        sans: ['"Rubik"', '"Space Grotesk"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        ui: ['"Rubik"', '"Space Grotesk"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        neo: {
          yellow: '#FFE600',
          cream: '#FFF7D6',
          pink: '#FF3399',
          cyan: '#00F0FF',
          lime: '#39FF14',
          orange: '#FF6600',
          purple: '#B026FF',
          dark: '#121212',
          light: '#FFFDF0',
        }
      },
      boxShadow: {
        'brutal-sm': '2px 2px 0px 0px #000000',
        'brutal': '4px 4px 0px 0px #000000',
        'brutal-lg': '6px 6px 0px 0px #000000',
        'brutal-press': '1px 1px 0px 0px #000000',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
      },
      animation: {
        'shake': 'shake 0.3s cubic-bezier(0.36, 0.07, 0.19, 0.97) both',
        'damage-pop': 'damagePop 0.75s ease-out forwards',
        'combo-pop': 'comboPop 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'monster-lunge': 'monsterLunge 0.3s ease-in-out',
        'float-wiggle': 'floatWiggle 3s ease-in-out infinite',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-8px) rotate(-1deg)' },
          '40%, 80%': { transform: 'translateX(8px) rotate(1deg)' },
        },
        damagePop: {
          '0%': { opacity: '0', transform: 'scale(0.5) translateY(10px) rotate(-6deg)' },
          '25%': { opacity: '1', transform: 'scale(1.3) translateY(-14px) rotate(4deg)' },
          '75%': { opacity: '1', transform: 'scale(1) translateY(-28px) rotate(-2deg)' },
          '100%': { opacity: '0', transform: 'scale(0.8) translateY(-42px) rotate(0deg)' },
        },
        comboPop: {
          '0%': { transform: 'scale(0.7) rotate(-4deg)', opacity: '0' },
          '70%': { transform: 'scale(1.2) rotate(4deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        monsterLunge: {
          '0%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(22px) scale(1.1) rotate(2deg)' },
          '100%': { transform: 'translateY(0) scale(1)' },
        },
        floatWiggle: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(2deg)' },
        }
      }
    },
  },
  plugins: [],
}
