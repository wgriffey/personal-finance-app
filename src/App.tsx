import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import HomeDashboard from './components/HomeDashboard';
import Login from './components/Login';
import { CookiesProvider } from 'react-cookie';
import Layout from './components/shared/Layout';
import { useState, useEffect } from 'react';

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
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/' element={<Layout theme={theme} handleThemeSwitch={setTheme} />}>
                        <Route path='home' element={<HomeDashboard />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </CookiesProvider>
    );
}

export default App;
