import { useActivation } from '@auth/hooks/useActivation';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';

type ActivationURLParams = {
    uid: string;
    token: string;
};

function ActivationPage() {
    const params = useParams<ActivationURLParams>();
    const activationMutation = useActivation();
    const navigate = useNavigate();

    useEffect(() => {
        if (params.uid && params.token) {
            activationMutation.mutate(
                {
                    uid: params.uid,
                    token: params.token,
                },
                { onSuccess: () => navigate('/login') },
            );
        }
    }, [params.uid, params.token]);

    return (
        <div className='relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-backgroundColor-primary text-center'>
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

export default ActivationPage;
