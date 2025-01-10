import { createContext, Dispatch, ReactNode, useMemo, useReducer } from 'react';

interface AuthState {
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false,
};

type AuthAction = { type: 'LOG_IN' } | { type: 'LOG_OUT' };

interface AuthContextShape {
    login: () => void;
    logout: () => void;
    authState: AuthState;
    dispatch: Dispatch<AuthAction>;
}

const defaultContextValue: AuthContextShape = {
    login: () => {},
    logout: () => {},
    authState: initialState,
    dispatch: () => {},
};

const AuthContext = createContext<AuthContextShape>(defaultContextValue);

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

    const login = () => dispatch({ type: 'LOG_IN' });
    const logout = () => dispatch({ type: 'LOG_OUT' });

    const value: AuthContextShape = useMemo(
        () => ({
            login,
            logout,
            authState,
            dispatch,
        }),
        [authState],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
