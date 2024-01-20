import Header from './Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { ThemeProp } from '../interfaces/ThemeProps';
import Sidebar from './Sidebar';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import LaunchPlaidLink from '../features/Plaid/components/LaunchPlaidLink.tsx';
import useLink from '../features/Plaid/hooks/useLink.ts';

function Layout(theme: ThemeProp) {
    const [userToken] = useCookies<string>(['myToken']);
    const [linkToken, setLinkToken] = useState('');
    const { linkTokens } = useLink();
    const navigate = useNavigate();

    // Redirect to log in if not authenticated
    useEffect(() => {
        if (!userToken['myToken']) {
            navigate('/login');
        }
    }, [navigate, userToken]);

    useEffect(() => {
        setLinkToken(linkTokens.byUser[userToken['myToken']]);
    }, [linkTokens]);

    return (
        <div className='flex h-[100dvh] w-[100dwh] flex-row overflow-hidden bg-backgroundColor-secondary'>
            <Sidebar />
            <div className='flex min-w-full flex-col md:min-w-[85%]'>
                <Header theme={theme.theme} handleThemeSwitch={theme.handleThemeSwitch} />
                <div className='flex h-full w-full flex-col overflow-auto'>
                    <Outlet />
                </div>
            </div>
            {linkToken !== null && linkToken !== undefined && linkToken.length > 0 && (
                <LaunchPlaidLink
                    linkToken={linkToken}
                    userToken={userToken['myToken']}
                    item={null}
                />
            )}
        </div>
    );
}

export default Layout;
