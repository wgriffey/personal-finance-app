import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../features/Authentication/components/LoginForm';

function LoginPage() {
    const [userToken] = useCookies(['myToken']);
    const navigate = useNavigate();

    useEffect(() => {
        if (userToken['myToken'] && userToken['myToken'] !== undefined) {
            navigate('/home');
        }
    }, [navigate, userToken]);

    return (
        <div className='relative flex min-h-[100dvh] min-w-[100dwh] flex-col items-center justify-center overflow-hidden bg-backgroundColor-primary text-center shadow-lg backdrop-blur-sm backdrop-filter '>
            <h1 className=' font-mono text-4xl text-textColor-primary'>
                Welcome to Personal Finance!
            </h1>
            <div className='grid h-[400px] w-[600px] grid-cols-1 items-center rounded-md border border-solid border-textColor-primary bg-transparent'>
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;
