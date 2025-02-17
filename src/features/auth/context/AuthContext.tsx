import AuthService from '@auth/services/AuthService';
import { createContext, Dispatch, ReactNode, useEffect, useMemo, useReducer } from 'react';
import { flushSync } from 'react-dom';
import { type FetchResponse } from '@utils/fetchMiddleware';

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false,
    isLoading: true,
};

type AuthAction = { type: 'LOG_IN' } | { type: 'LOG_OUT' };

export interface AuthContextShape {
    login: () => void;
    logout: () => void;
    authState: AuthState;
    dispatch: Dispatch<AuthAction>;
}

const AuthContext = createContext<AuthContextShape | null>(null);

function reducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'LOG_IN':
            return { ...state, isAuthenticated: true, isLoading: false };
        case 'LOG_OUT':
            return { ...state, isAuthenticated: false, isLoading: false };
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

    function login() {
        flushSync(() => dispatch({ type: 'LOG_IN' }));
    }
    function logout() {
        flushSync(() => dispatch({ type: 'LOG_OUT' }));
    }

    useEffect(() => {
        async function isUserAuthenticated() {
            const verifyResponse = await AuthService.verifyUserAccessToken().catch(
                (error: Error) => {
                    if (error.message.includes('Token refresh failed')) {
                        return { data: null, status: 401 } satisfies FetchResponse;
                    }
                },
            );

            if (verifyResponse?.status === 200) {
                login();
            } else {
                logout();
            }
        }
        isUserAuthenticated();
        console.log(`AuthContext init: ${authState.isLoading}`);
    }, []);

    const value: AuthContextShape = useMemo(
        () => ({
            login,
            logout,
            authState,
            authCheckPromise,
            dispatch,
        }),
        [authState, login, logout, dispatch],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
