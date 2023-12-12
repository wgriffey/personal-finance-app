/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                backgroundColor: {
                    primary: "var(--color-bg-primary)",
                    secondary: "var(--color-bg-secondary)",
                },
                textColor: {
                    accent: "var(--color-text-accent)",
                    primary: "var(--color-text-primary)",
                    secondary: "var(--color-text-secondary)",
                },
            }
        },
    },
    plugins: [],
}

