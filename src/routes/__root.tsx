import { AuthContextShape } from '@auth/context/AuthContext';
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRouteWithContext<{
    auth: AuthContextShape;
    queryClient: QueryClient;
}>()({
    component: RootComponent,
    notFoundComponent: () => {
        return (
            <div>
                <p>Page not found. Please go back to your dashboard</p>
                <Link to='/dashboard'>Dashboard</Link>
            </div>
        );
    },
});

function RootComponent() {
    return (
        <>
            <Outlet />
            <ReactQueryDevtools buttonPosition='bottom-right' />
            <TanStackRouterDevtools position='top-right' />
        </>
    );
}
