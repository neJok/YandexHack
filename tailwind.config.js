/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            screens: {
                'xs': '480px',
            },
            colors: {
                'yandex-blue': '#2A7DEC',
                'yandex-gray': '#F0F2F3',
                'plus-lg': '0 8px 24px rgba(0,0,0,0.12)',
                'plus-xl': '0 12px 32px rgba(0,0,0,0.15)',
                'plus-inner': 'inset 0 2px 8px rgba(0,0,0,0.08)',
            },
        },
    },
    plugins: [],
};