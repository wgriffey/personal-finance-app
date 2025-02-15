import AuthService from '@auth/services/AuthService';
import { createContext, Dispatch, ReactNode, useEffect, useMemo, useReducer } from 'react';
import { flushSync } from 'react-dom';

interface AuthState {
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false,
};

type AuthAction = { type: 'LOG_IN' } | { type: 'LOG_OUT' };

export interface AuthContextShape {
    login: () => void;
    logout: () => void;
    authState: AuthState;
    authCheckPromise: Promise<void> | null;
    dispatch: Dispatch<AuthAction>;
}

const AuthContext = createContext<AuthContextShape | null>(null);

function reducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'LOG_IN':
            return { ...state, isAuthenticated: true };
        case 'LOG_OUT':
            return { ...state, isAuthenticated: false };
        default:
            return state;
    }
}

interface AuthProviderProps {
    children: ReactNode;
}

// Add a Promise that resolves when initial auth check is done
let authCheckPromise: Promise<void> | null = null;

export function AuthProvider({ children }: AuthProviderProps) {
    const [authState, dispatch] = useReducer(reducer, initialState);

    const login = () => {
        console.log('LOGIN CASE IN CONTEXT');

        flushSync(() => dispatch({ type: 'LOG_IN' }));
    };
    const logout = () => {
        flushSync(() => dispatch({ type: 'LOG_OUT' }));
    };

    useEffect(() => {
        async function isUserAuthenticated() {
            const verifyResponse = await AuthService.verifyUserAccessToken();

            if (verifyResponse.status === 200) {
                login();
            } else {
                logout();
            }
        }
        authCheckPromise = isUserAuthenticated();
        console.log(`AuthContext init: ${authState.isAuthenticated}`);
    }, []);

    const value: AuthContextShape = useMemo(
        () => ({
            login,
            logout,
            authState,
            authCheckPromise,
            dispatch,
        }),
        [authState, login, logout, authCheckPromise, dispatch],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
