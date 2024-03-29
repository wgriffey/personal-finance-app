import React, { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLogin } from '../hooks/useLogin';
import { useRegister } from '../hooks/useRegister';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [isLoginError, setIsLoginError] = useState(false);
    const loginMutation = useLogin();
    const registerMutation = useRegister();

    function onLogIn(event: any) {
        event.preventDefault();
        loginMutation.mutate({ username, password }, { onError: () => setIsLoginError(true) });
    }

    function onSignUp(event: any) {
        event.preventDefault();
        registerMutation.mutate(
            { username, email, password },
            {
                onSuccess: () => onLogIn(event),
                onError: () => setIsLoginError(true),
            },
        );
    }

    return (
        <form className='items-center justify-center space-y-2'>
            <div className='relative'>
                <input
                    type='text'
                    id='username'
                    className='peer ml-8 block w-[90%] appearance-none rounded-t-lg border-0 border-b-2 border-textColor-secondary bg-transparent px-2.5 pb-2.5 pt-5 text-sm text-textColor-secondary autofill:bg-red-600 focus:border-textColor-primary focus:text-textColor-primary focus:outline-none focus:ring-0'
                    placeholder=''
                    onChange={(e) => {
                        setUsername(e.target.value);
                        setIsLoginError(false);
                    }}
                />
                <label
                    htmlFor='username'
                    className='absolute start-2.5 top-4 z-10 ml-6 origin-[0] -translate-y-4 scale-75 transform text-sm text-textColor-secondary duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-textColor-primary rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4'
                >
                    Username
                </label>
            </div>
            {!isLogin ? (
                <div className='relative'>
                    <input
                        type='email'
                        id='email'
                        className='peer ml-8 block w-[90%] appearance-none rounded-t-lg border-0 border-b-2 border-textColor-secondary bg-transparent px-2.5 pb-2.5 pt-5 text-sm text-textColor-secondary autofill:bg-transparent focus:border-textColor-primary focus:text-textColor-primary focus:outline-none focus:ring-0'
                        placeholder=''
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setIsLoginError(false);
                        }}
                    />
                    <label
                        htmlFor='email'
                        className='absolute start-2.5 top-4 z-10 ml-6 origin-[0] -translate-y-4 scale-75 transform text-sm text-textColor-secondary duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-textColor-primary rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4'
                    >
                        Email
                    </label>
                </div>
            ) : null}
            <div className='relative'>
                <input
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    className='peer ml-8 block w-[90%] appearance-none rounded-t-lg border-0 border-b-2 border-textColor-secondary bg-transparent px-2.5 pb-2.5 pt-5 text-sm text-textColor-secondary autofill:bg-transparent focus:border-textColor-primary focus:text-textColor-primary focus:outline-none focus:ring-0'
                    placeholder=''
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setIsLoginError(false);
                    }}
                />
                <label
                    htmlFor='password'
                    className='absolute start-2.5 top-4 z-10 ml-6 origin-[0] -translate-y-4 scale-75 transform text-sm text-textColor-secondary duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-textColor-primary rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4'
                >
                    Password
                </label>
                {showPassword ? (
                    <FontAwesomeIcon
                        icon={faEye}
                        className='absolute right-8 top-7 text-textColor-secondary peer-focus:text-textColor-primary'
                        onClick={() => setShowPassword(!showPassword)}
                    />
                ) : (
                    <FontAwesomeIcon
                        icon={faEyeSlash}
                        className='absolute right-8 top-7 text-textColor-secondary peer-focus:text-textColor-primary'
                        onClick={() => setShowPassword(!showPassword)}
                    />
                )}
            </div>
            <div>
                {isLoginError ? (
                    <span className='text-md text-red-600'>
                        {isLogin ? loginMutation.error?.message : registerMutation.error?.message}
                    </span>
                ) : null}
            </div>
            <div className='space-y-2'>
                <button
                    type='submit'
                    className='mt-8 px-20 py-2'
                    onClick={(event) => (isLogin ? onLogIn(event) : onSignUp(event))}
                >
                    {isLogin ? 'Log In' : 'Sign Up'}
                </button>
                <div>
                    <span className='text-textColor-secondary'>
                        {isLogin ? 'New to Gryffen Finance? ' : 'Existing User? '}
                        <button
                            type='reset'
                            className='border-none bg-transparent text-textColor-primary'
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'Join Here!' : 'Log In Here!'}
                        </button>
                    </span>
                </div>
            </div>
        </form>
    );
}

export default LoginForm;
