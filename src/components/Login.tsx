import React, { useEffect, useState } from 'react'
import APIService from '../services/APIService';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = useState('')
    const [isLogin, setIsLogin] = useState(true)
    const [isLoginError, setIsLoginError] = useState(false)
    const [userToken, setUserToken] = useCookies(['myToken'])
    const navigate = useNavigate();
    
    useEffect(() => {
        if(userToken['myToken'] && userToken['myToken'] !== undefined ){
            navigate('/transactions')
        }
    }, [userToken])

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    const onLogIn = () => {
        APIService.LogInUser({username, password})
        .then(res => {
            if(!res.token){
                setIsLoginError(true)
            }
            else{
                setUserToken('myToken', res.token)
            }
        })
        .catch(error => console.log(error))
    }

    const onSignUp = () => {
        APIService.SignUpUser({username, email, password})
        .then(() => onLogIn())
        .catch(error => console.log(error))
    }
  return (
    <div className='flex flex-col justify-center text-center items-center relative min-h-[100dvh] min-w-[100dwh] overflow-hidden bg-backgroundColor-primary shadow-lg backdrop-filter backdrop-blur-sm '>
        <h1 className=' text-textColor-primary text-4xl font-mono'>Welcome to Personal Finance!</h1>
        <div className='grid grid-cols-1 border border-solid border-textColor-primary rounded-md bg-transparent w-[600px] h-[400px] items-center'>
            <form className='space-y-2 items-center justify-center'>
            <div className='relative'>
                    <input type="text" id="username" className="block rounded-t-lg px-2.5 pb-2.5 pt-5 ml-8 w-[90%] text-sm text-textColor-secondary bg-transparent border-0 border-b-2 border-textColor-secondary appearance-none focus:outline-none focus:ring-0 focus:text-textColor-primary focus:border-textColor-primary autofill:bg-red-600 peer" placeholder="" />
                    <label htmlFor="username" className="absolute ml-6 text-sm text-textColor-secondary duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-textColor-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Username</label>
                </div>
                {!isLogin ?
                 <div className='relative'>
                    <input type="email" id="email" className="block rounded-t-lg px-2.5 pb-2.5 pt-5 ml-8 w-[90%] text-sm text-textColor-secondary bg-transparent border-0 border-b-2 border-textColor-secondary appearance-none focus:outline-none focus:ring-0 focus:text-textColor-primary focus:border-textColor-primary autofill:bg-transparent peer" placeholder="" />
                    <label htmlFor="email" className="absolute ml-6 text-sm text-textColor-secondary duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-textColor-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email</label>
                </div> : null}
                <div className='relative'>
                    <input type="password" id="password" className="block rounded-t-lg px-2.5 pb-2.5 pt-5 ml-8 w-[90%] text-sm text-textColor-secondary bg-transparent border-0 border-b-2 border-textColor-secondary appearance-none focus:outline-none focus:ring-0 focus:text-textColor-primary focus:border-textColor-primary autofill:bg-transparent peer" placeholder="" />
                    <label htmlFor="password" className="absolute ml-6 text-sm text-textColor-secondary duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-textColor-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Password</label>
                </div>
                <div className='space-y-2'>
                    <button type='submit' className='mt-8 px-20 py-2'>
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </button>
                    <div>
                        <span className='text-textColor-secondary'>{isLogin ? 'New to Personal Finance?' : 'Existing User?'} <button type='reset' className='border-none bg-transparent text-textColor-primary' onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Join Here!' : 'Log In Here!'}</button></span>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login

