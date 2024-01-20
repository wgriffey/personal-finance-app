import { useContext } from 'react';
import PlaidLinkContext from '../context/PlaidLinkContext.tsx';

/**
 * @desc A convenience hook to provide access to the Link context state in components.
 */
export default function useLink() {
    const context = useContext(PlaidLinkContext);
    if (!context) {
        throw new Error(`useLink must be used within a LinkProvider`);
    }

    return context;
}
