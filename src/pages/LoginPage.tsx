import { useNavigate } from 'react-router-dom';
import LoginForm from '@auth/components/LoginForm';

function LoginPage() {
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (userToken['myToken'] && userToken['myToken'] !== undefined) {
    //         navigate('/home');
    //     }
    // }, [navigate, userToken]);

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
