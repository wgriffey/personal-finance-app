import Header from '@layout/Header';
import Sidebar from '@layout/Sidebar';
import LaunchPlaidLink from '@plaid/components/LaunchPlaidLink';
import useLink from '@plaid/hooks/useLink';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/_auth')({
    beforeLoad: async ({ context, location }) => {
        console.log(`Auth beforeLoad: ${context.auth.authState.isAuthenticated}`);

        if (!context.auth.authState.isAuthenticated) {
            throw redirect({
                to: '/login',
                search: {
                    redirect: location.href,
                },
            });
        }
    },
    component: AuthLayout,
});

function AuthLayout() {
    const [linkToken, setLinkToken] = useState('');
    const { linkTokens } = useLink();

    useEffect(() => {
        setLinkToken(linkTokens.byUser['user']);
        console.log(linkToken);
    }, [linkTokens]);

    return (
        <div className='flex max-h-dvh transform bg-backgroundColor-secondary transition-colors duration-300'>
            <Sidebar />
            <div className='flex min-w-full flex-col md:min-w-[85%]'>
                <Header />
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
