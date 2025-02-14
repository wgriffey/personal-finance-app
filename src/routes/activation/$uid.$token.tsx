import { useActivation } from '@auth/hooks/useActivation';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/activation/$uid/$token')({
    component: Activation,
});


function Activation() {
    const params = Route.useParams();
    const activationMutation = useActivation();
    const navigate = useNavigate();

    useEffect(() => {
        if (params.uid && params.token) {
            activationMutation.mutate(
                {
                    uid: params.uid,
                    token: params.token,
                },
                { onSuccess: () => navigate({ to: '/login' }) },
            );
        }
    }, [params.uid, params.token]);

    return (
        <div className='relative flex min-h-dvh flex-col items-center justify-center bg-backgroundColor-primary text-center'>
            {activationMutation.isPending && (
                <h1 className='font-mono text-4xl text-textColor-primary'>
                    Activating Your Account {<span className='animate-pulse'>...</span>}
                </h1>
            )}
            {activationMutation.isSuccess && (
                <h1 className='font-mono text-4xl text-textColor-primary'>Activated!</h1>
            )}
            {activationMutation.isError && (
                <h1 className='font-mono text-4xl text-textColor-primary'>Activation Failed!</h1>
            )}
        </div>
    );
}
