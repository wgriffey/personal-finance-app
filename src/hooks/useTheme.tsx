import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

/**
 * @desc A convenience hook to provide access to the Theme context state in components.
 */
export default function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error(`useTheme must be used within a AuthProvider`);
    }

    return context;
}
