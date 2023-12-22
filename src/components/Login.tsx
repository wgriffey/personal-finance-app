import React, { useEffect, useState } from 'react';
import APIService from '../services/APIService';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [isLoginError, setIsLoginError] = useState(false);
    const [userToken, setUserToken] = useCookies(['myToken']);
    const navigate = useNavigate();

    useEffect(() => {
        if (userToken['myToken'] && userToken['myToken'] !== undefined) {
            navigate('/transactions');
        }
    }, [userToken]);

    function onLogIn() {
        APIService.LogInUser({ username, password })
            .then((res) => {
                if (!res.token) {
                    setIsLoginError(true);
                } else {
                    setUserToken('myToken', res.token);
                }
            })
            .catch((error) => console.log(error));
    }

    function onSignUp() {
        APIService.SignUpUser({ username, email, password })
            .then(() => onLogIn())
            .catch((error) => console.log(error));
    }

    return (
        <div className='relative flex min-h-[100dvh] min-w-[100dwh] flex-col items-center justify-center overflow-hidden bg-backgroundColor-primary text-center shadow-lg backdrop-blur-sm backdrop-filter '>
            <h1 className=' font-mono text-4xl text-textColor-primary'>
                Welcome to Personal Finance!
            </h1>
            <div className='grid h-[400px] w-[600px] grid-cols-1 items-center rounded-md border border-solid border-textColor-primary bg-transparent'>
                <form className='items-center justify-center space-y-2'>
                    <div className='relative'>
                        <input
                            type='text'
                            id='username'
                            className='peer ml-8 block w-[90%] appearance-none rounded-t-lg border-0 border-b-2 border-textColor-secondary bg-transparent px-2.5 pb-2.5 pt-5 text-sm text-textColor-secondary autofill:bg-red-600 focus:border-textColor-primary focus:text-textColor-primary focus:outline-none focus:ring-0'
                            placeholder=''
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
                    <div className='space-y-2'>
                        <button type='submit' className='mt-8 px-20 py-2'>
                            {isLogin ? 'Log In' : 'Sign Up'}
                        </button>
                        <div>
                            <span className='text-textColor-secondary'>
                                {isLogin ? 'New to Personal Finance?' : 'Existing User?'}{' '}
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
            </div>
        </div>
    );
}

export default Login;
