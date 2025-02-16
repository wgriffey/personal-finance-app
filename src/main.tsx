import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AuthProvider } from '@auth/context/AuthContext.tsx';
import { PlaidLinkProvider } from '@plaid/context/PlaidLinkContext.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useAuth from '@auth/hooks/useAuth';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { ThemeProvider } from './context/ThemeContext';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60,
            retry: 0,
        },
        mutations: {
            retry: 0,
        },
    },
});

const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    scrollRestoration: true,
    context: {
        auth: undefined!,
        queryClient: queryClient,
    },
});

function InnerApp() {
    const auth = useAuth();

    if (auth.authState.isLoading) {
        return;
    }

    return <RouterProvider router={router} context={{ auth: auth }} />;
}

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <QueryClientProvider client={queryClient}>
                    <PlaidLinkProvider>
                        <InnerApp />
                    </PlaidLinkProvider>
                </QueryClientProvider>
            </ThemeProvider>
        </AuthProvider>
    );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
