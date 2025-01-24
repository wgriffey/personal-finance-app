import { useState, useRef, useEffect } from 'react';
import InputField from '@auth/components/InputField';
import { useLogin } from '@auth/hooks/useLogin';
import { useRegister } from '@auth/hooks/useRegister';
import { User } from '@interfaces/User';
import Spinner from '@components/Spinner';

const LoginForm = () => {
    const formRef = useRef<User>({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        rePassword: '',
    });
    const firstInputRef = useRef<HTMLInputElement>(null);

    const [showPassword, setShowPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [isLoginError, setIsLoginError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const loginMutation = useLogin();
    const registerMutation = useRegister();

    useEffect(() => {
        firstInputRef.current?.focus();
    }, [isLogin]);

    function onLogIn(formData: User) {
        loginMutation.mutate(
            { email: formData.email, password: formData.password },
            {
                onError: (error) => {
                    setIsLoginError(true);
                    setErrorMessage(error.message);
                },
            },
        );
    }

    function onRegister(formData: User) {
        registerMutation.mutate(formData, {
            onSuccess: () => setIsLogin(true),
            onError: (error) => {
                setIsLoginError(true);
                setErrorMessage(error.message);
            },
        });
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target;
        formRef.current[id as keyof User] = value;
        setIsLoginError(false);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoginError(false);

        const formData = formRef.current;

        if (isLogin) {
            if (!formData.email || !formData.password) {
                setIsLoginError(true);
                setErrorMessage('Please fill in all fields');
                return;
            }
            onLogIn(formData);
        } else {
            if (
                !formData.email ||
                !formData.password ||
                !formData.firstName ||
                !formData.lastName ||
                !formData.rePassword
            ) {
                setIsLoginError(true);
                setErrorMessage('Please fill in all fields');
                return;
            }
            if (formData.password !== formData.rePassword) {
                setIsLoginError(true);
                setErrorMessage('Passwords do not match');
                return;
            }
            onRegister(formData);
        }
    }

    function handleToggleMode(e: React.MouseEvent<HTMLButtonElement>) {
        formRef.current = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            rePassword: '',
        };
        // Use form reference instead of deprecated event.target
        const form = e.currentTarget.closest('form') as HTMLFormElement;
        if (form) {
            form.reset();
        }
        setIsLogin(!isLogin);
        setIsLoginError(false);
    }

    return (
        <form className='items-center justify-center space-y-4' onSubmit={handleSubmit}>
            {!isLogin && (
                <>
                    <InputField
                        id='firstName'
                        label='First Name'
                        ref={firstInputRef}
                        defaultValue={formRef.current.firstName}
                        onChange={handleInputChange}
                    />
                    <InputField
                        id='lastName'
                        label='Last Name'
                        defaultValue={formRef.current.lastName}
                        onChange={handleInputChange}
                    />
                </>
            )}
            <InputField
                id='email'
                label='Email'
                type='email'
                ref={isLogin ? firstInputRef : null}
                defaultValue={formRef.current.email}
                onChange={handleInputChange}
            />
            <InputField
                id='password'
                label='Password'
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                defaultValue={formRef.current.password}
                onChange={handleInputChange}
            />
            {!isLogin && (
                <InputField
                    id='rePassword'
                    label='Confirm Password'
                    showPassword={showPassword}
                    onTogglePassword={() => setShowPassword(!showPassword)}
                    defaultValue={formRef.current.rePassword}
                    onChange={handleInputChange}
                />
            )}

            {isLoginError && <div className='text-md px-8 text-red-600'>{errorMessage}</div>}

            <div className='space-y-2'>
                <button
                    disabled={registerMutation.isPending || loginMutation.isPending}
                    className='primary-button disabled:opacity-75'
                >
                    {loginMutation.isPending || registerMutation.isPending ? (
                        <Spinner height='h-6' width='w-6' color='border-textColor-secondary' />
                    ) : isLogin ? (
                        'Log In'
                    ) : (
                        'Sign Up'
                    )}
                </button>

                <div>
                    <span className='text-textColor-secondary'>
                        {isLogin ? 'New to Gryffen Finance? ' : 'Existing User? '}
                        <button
                            type='reset'
                            disabled={registerMutation.isPending || loginMutation.isPending}
                            className='border-none bg-transparent text-blue-500 hover:text-blue-600 disabled:opacity-50'
                            onClick={handleToggleMode}
                        >
                            {isLogin ? 'Join Here!' : 'Log In Here!'}
                        </button>
                    </span>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;
