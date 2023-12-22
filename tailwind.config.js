/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                backgroundColor: {
                    primary: 'rgb(var(--color-bg-primary) / <alpha-value>)',
                    secondary: 'rbg(var(--color-bg-secondary) / <alpha-value>)',
                },
                textColor: {
                    accent: 'rgb(var(--color-text-accent) / <alpha-value>)',
                    primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
                    secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
                },
            },
        },
    },
    plugins: [],
};
