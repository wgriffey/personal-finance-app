import { Routes, Route, BrowserRouter } from 'react-router';
import './App.css';
import DashboardPage from '@pages/DashboardPage';
import LoginPage from '@pages/LoginPage';
import Layout from '@layout/Layout';
import { useState, useEffect } from 'react';
import TransactionsPage from '@pages/TransactionsPage';
import InvestmentsPage from '@pages/InvestmentsPage';
import LinkedAccountsPage from '@pages/LinkedAccountsPage';
import SettingsPage from '@pages/SettingsPage';
import { PlaidLinkProvider } from '@plaid/context/PlaidLinkContext';
import ActivationPage from '@pages/ActivationPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from '@auth/context/AuthContext';
import PasswordResetPage from '@pages/PasswordResetPage';
import PasswordResetConfirmPage from '@pages/PasswordResetConfirmPage';

function App() {
    const [theme, setTheme] = useState<string>('light');

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

    useEffect(() => {
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }, []);

    useEffect(() => {
        function handleThemeSwitch(): void {
            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
        }
        handleThemeSwitch();
    }, [theme]);

    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <PlaidLinkProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/login' element={<LoginPage />} />
                            <Route path='/password-reset' element={<PasswordResetPage />} />
                            <Route path='/activation/:uid/:token' element={<ActivationPage />} />
                            <Route
                                path='/password-reset/:uid/:token'
                                element={<PasswordResetConfirmPage />}
                            />
                            <Route
                                path='/'
                                element={<Layout theme={theme} handleThemeSwitch={setTheme} />}
                            >
                                <Route path='dashboard' element={<DashboardPage />} />
                                <Route path='transactions' element={<TransactionsPage />} />
                                <Route path='investments' element={<InvestmentsPage />} />
                                <Route path='linked-accounts' element={<LinkedAccountsPage />} />
                                <Route path='settings' element={<SettingsPage />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </PlaidLinkProvider>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </AuthProvider>
    );
}

export default App;
