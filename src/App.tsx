import { useState } from 'react'
import {Routes, Route, useLocation, BrowserRouter} from 'react-router-dom'
import './App.css'
import HomeDashboard from './components/HomeDashboard'
import Navbar from './components/Navbar'
import Login from './components/Login'
import { CookiesProvider } from 'react-cookie'

function App() {
    return (
        <div className="dark">
            <CookiesProvider>
                <BrowserRouter>
                    <div className='bg-blue-500 min-h-screen min-w-full'>
                            {location.pathname !== '/login' && <Navbar/>}
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
