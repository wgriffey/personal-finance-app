import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import HomeDashboardPage from './pages/HomeDashboardPage';
import LoginPage from './pages/LoginPage';
import { CookiesProvider } from 'react-cookie';
import Layout from './layout/Layout';
import { useState, useEffect } from 'react';
import TransactionsPage from './pages/TransactionsPage';
import InvestmentsPage from './pages/InvestmentsPage';
import LinkedAccountsPage from './pages/LinkedAccountsPage';
import SettingsPage from './pages/SettingsPage';
import { PlaidLinkProvider } from './features/Plaid/context/PlaidLinkContext.tsx';

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
        <CookiesProvider>
            <PlaidLinkProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/login' element={<LoginPage />} />
                        <Route
                            path='/'
                            element={<Layout theme={theme} handleThemeSwitch={setTheme} />}
                        >
                            <Route path='home' element={<HomeDashboardPage />} />
                            <Route path='transactions' element={<TransactionsPage />} />
                            <Route path='investments' element={<InvestmentsPage />} />
                            <Route path='linked-accounts' element={<LinkedAccountsPage />} />
                            <Route path='settings' element={<SettingsPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </PlaidLinkProvider>
        </CookiesProvider>
    );
}

export default App;
