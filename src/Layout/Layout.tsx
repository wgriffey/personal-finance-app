import Header from './Header';
import { Outlet, useNavigate } from 'react-router';
import { ThemeProp } from '@interfaces/ThemeProps';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import LaunchPlaidLink from '@plaid/components/LaunchPlaidLink.tsx';
import useLink from '@plaid/hooks/useLink.ts';

function Layout(theme: ThemeProp) {
    const [linkToken, setLinkToken] = useState('');
    const { linkTokens } = useLink();
    const navigate = useNavigate();

    // Redirect to log in if not authenticated
    // useEffect(() => {
    //     if (!userToken['myToken']) {
    //         navigate('/login');
    //     }
    // }, []);

    useEffect(() => {
        setLinkToken(linkTokens.byUser['user']);
    }, [linkTokens]);

    return (
        <div className='flex min-h-[100dvh] flex-row overflow-hidden bg-backgroundColor-secondary'>
            <Sidebar />
            <div className='flex min-w-full flex-col md:min-w-[85%]'>
                <Header theme={theme.theme} handleThemeSwitch={theme.handleThemeSwitch} />
                <div className='flex h-full w-full flex-col overflow-auto'>
                    <Outlet />
                </div>
            </div>
            {linkToken !== null && linkToken !== undefined && linkToken.length > 0 && (
                <LaunchPlaidLink linkToken={linkToken} item={null} />
            )}
        </div>
    );
}

export default Layout;
