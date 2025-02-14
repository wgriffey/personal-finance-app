import { useContext } from 'react';
import AuthContext from '@auth/context/AuthContext';

/**
 * @desc A convenience hook to provide access to the Auth context state in components.
 */
export default function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(`useAuth must be used within a AuthProvider`);
    }

    return context;
}
