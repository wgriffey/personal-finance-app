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
import { AuthProvider } from '@auth/context/AuthContext';
import ActivationPage from '@pages/ActivationPage';

function App() {
    const [theme, setTheme] = useState<string>('light');

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
            <PlaidLinkProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/activation/:uid/:token' element={<ActivationPage />} />
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
        </AuthProvider>
    );
}

export default App;
