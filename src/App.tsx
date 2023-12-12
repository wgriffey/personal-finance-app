import {Routes, Route, useLocation, BrowserRouter} from 'react-router-dom'
import './App.css'
import HomeDashboard from './components/HomeDashboard'
import Navbar from './components/Navbar'
import Login from './components/Login'
import { CookiesProvider } from 'react-cookie'
import { useEffect, useState } from 'react'

function App() {
    const [theme, setTheme] = useState<string>('light')

    function handleThemeSwitch(): void {
        if(theme === 'dark'){
            document.documentElement.setAttribute('data-theme', 'dark');  
        }
        else {
            document.documentElement.removeAttribute('data-theme'); 
        }
    }

    useEffect(() => {
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }, []);

    useEffect(() => {
        handleThemeSwitch();
    }, [theme]);

    return (
        <div>
            <CookiesProvider>
                <BrowserRouter>
                    <div className='min-h-[100dvh] min-w-full bg-backgroundColor-primary overflow-hidden'>
                            {location.pathname !== '/login' && <Navbar theme={theme} handleThemeSwitch={setTheme}/>}
                            <Routes>
                                <Route path = '/login' element = {<Login/>}/>
                                <Route path = '/home' element = {<HomeDashboard/>}/>
                            </Routes>
                    </div>
                </BrowserRouter>
            </CookiesProvider>
        </div>
  )
}

export default App
