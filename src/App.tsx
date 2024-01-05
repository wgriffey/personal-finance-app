import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import HomeDashboard from './pages/HomeDashboard';
import Login from './pages/Login';
import { CookiesProvider } from 'react-cookie';
import Layout from './Layout/Layout';
import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
    const [theme, setTheme] = useState<string>('light');
    const queryClient = new QueryClient();

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
        <QueryClientProvider client={queryClient}>
            <CookiesProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route
                            path='/'
                            element={<Layout theme={theme} handleThemeSwitch={setTheme} />}
                        >
                            <Route path='home' element={<HomeDashboard />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </CookiesProvider>
        </QueryClientProvider>
    );
}

export default App;
