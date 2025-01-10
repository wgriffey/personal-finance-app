import { useNavigate } from 'react-router';
import LoginForm from '@auth/components/LoginForm';
import useAuth from '@auth/hooks/useAuth';
import { useEffect } from 'react';

function LoginPage() {
    const navigate = useNavigate();
    const { authState } = useAuth();

    useEffect(() => {
        if (authState.isAuthenticated) {
            navigate('/dashboard');
        }
        console.log(authState);
    }, [authState]);

    return (
        <div className='relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-backgroundColor-primary text-center shadow-lg backdrop-blur-sm backdrop-filter'>
            <h1 className='font-mono text-4xl text-textColor-primary'>
                Welcome to Gryffen Finance!
            </h1>
            <div className='grid h-[400px] w-[600px] grid-cols-1 items-center rounded-md border border-solid border-textColor-primary bg-transparent'>
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;
