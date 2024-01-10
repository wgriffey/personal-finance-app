import Header from './Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { ThemeProp } from '../interfaces/ThemeProps';
import Sidebar from './Sidebar';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

function Layout(theme: ThemeProp) {
    const [userToken] = useCookies<string>(['myToken']);
    const navigate = useNavigate();

    // Redirect to log in if not authenticated
    useEffect(() => {
        if (!userToken['myToken']) {
            navigate('/login');
        }
    }, [navigate, userToken]);
    return (
        <div className='flex h-[100dvh] w-[100dwh] flex-row overflow-hidden bg-backgroundColor-secondary'>
            <Sidebar />
            <div className='flex min-w-full flex-col md:min-w-[85%]'>
                <Header theme={theme.theme} handleThemeSwitch={theme.handleThemeSwitch} />
                <div className='flex h-full w-full flex-col overflow-auto'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Layout;
