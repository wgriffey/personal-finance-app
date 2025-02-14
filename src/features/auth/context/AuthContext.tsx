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

export function AuthProvider({ children }: AuthProviderProps) {
    const [authState, dispatch] = useReducer(reducer, initialState);

    const login = () => {
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
        isUserAuthenticated();
    }, []);

    const value: AuthContextShape = useMemo(
        () => ({
            login,
            logout,
            authState,
            dispatch,
        }),
        [authState, login, logout, dispatch],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
