import { createContext, ReactNode, useEffect, useState } from 'react';

export interface ThemeContextShape {
    theme: string;
    updateTheme: () => void;
}

const defaultContextValue: ThemeContextShape = {
    theme: 'light',
    updateTheme: () => {},
};

const ThemeContext = createContext<ThemeContextShape>(defaultContextValue);

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }, []);

    function updateTheme() {
        if (theme === 'dark') {
            setTheme('light');
            document.documentElement.removeAttribute('data-theme');
        } else {
            setTheme('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }

    return <ThemeContext.Provider value={{ theme, updateTheme }}>{children}</ThemeContext.Provider>;
}

export default ThemeContext;
