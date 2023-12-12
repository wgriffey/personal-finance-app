import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import money from '../assets/images/money.png'
import { ThemeProp } from '../interfaces/ThemeProps';
import MoonIcon from './svgs/MoonIcon';
import SunIcon from './svgs/SunIcon';

function Navbar(theme: ThemeProp) {
    const [navMenuOpen, setNavMenuOpen] = useState<boolean>(false);
    
    function openNavMenu(){
       setNavMenuOpen(navMenuOpen => !navMenuOpen); 
    }

    function handleThemeToggle(){
        if(theme.theme === 'dark'){
            theme.handleThemeSwitch('light');
        }
        else{
            theme.handleThemeSwitch('dark');
        }
    }

    return (
        <nav className='w-full h-[80px] z-0 bg-textColor-accent sticky drop-shadow-lg top-0'>
            <div className='px-2 flex justify-between items-center w-full h-full'>
                <div className='flex items-center'>
                    <img src={money} width={40}></img>
                    <h1 className='text-3xl font-bold md:text-4xl'>Personal Finance App</h1>
                </div>
                <div className='hidden md:flex'>
                    <ul className='hidden md:flex mt-1'>
                        <li>Dashboard</li>
                        <li>Transactions</li>
                        <li>Investments</li>
                        <li>Linked Accounts</li>
                        <li>Log Out</li>
                    </ul>
                </div>
                <div className='hidden md:flex'>
                    <button className='px-8 py-3 mr-4'>
                        Link Account
                    </button>
                    <input type='checkbox' id='darkMode-toggle' className='w-0 h-0 hidden peer/toggle' checked={theme.theme === 'dark' ? true : false} onChange={handleThemeToggle} />
                    <label htmlFor='darkMode-toggle' className='w-16 h-8 mt-2 bg-backgroundColor-primary relative block rounded-3xl shadow-inner shadow-slate-600 cursor-pointer peer-checked/toggle:bg-backgroundColor-primary transition-[0.3s] after:w-6 after:h-6 after:absolute after:top-1 after:left-1 after:bg-gradient-to-b after:from-yellow-200 after:to-orange-600 after:rounded-2xl after:shadow-md after:transition-[0.3s] peer-checked/toggle:after:left-[62px] peer-checked/toggle:after:bg-gradient-to-b peer-checked/toggle:after:from-gray-400 peer-checked/toggle:after:to-neutral-950 peer-checked/toggle:after:translate-x-[-100%] active:after:w-8'>
                        <svg className=" fill-white transition-[0.3s] left-10 top-[6px] active:w-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.9001 2.30719C19.7392 1.8976 19.1616 1.8976 19.0007 2.30719L18.5703 3.40247C18.5212 3.52752 18.4226 3.62651 18.298 3.67583L17.2067 4.1078C16.7986 4.26934 16.7986 4.849 17.2067 5.01054L18.298 5.44252C18.4226 5.49184 18.5212 5.59082 18.5703 5.71587L19.0007 6.81115C19.1616 7.22074 19.7392 7.22074 19.9001 6.81116L20.3305 5.71587C20.3796 5.59082 20.4782 5.49184 20.6028 5.44252L21.6941 5.01054C22.1022 4.849 22.1022 4.26934 21.6941 4.1078L20.6028 3.67583C20.4782 3.62651 20.3796 3.52752 20.3305 3.40247L19.9001 2.30719Z" className="stroke-white"/>
                            <path d="M16.0328 8.12967C15.8718 7.72009 15.2943 7.72009 15.1333 8.12967L14.9764 8.52902C14.9273 8.65407 14.8287 8.75305 14.7041 8.80237L14.3062 8.95987C13.8981 9.12141 13.8981 9.70107 14.3062 9.86261L14.7041 10.0201C14.8287 10.0694 14.9273 10.1684 14.9764 10.2935L15.1333 10.6928C15.2943 11.1024 15.8718 11.1024 16.0328 10.6928L16.1897 10.2935C16.2388 10.1684 16.3374 10.0694 16.462 10.0201L16.8599 9.86261C17.268 9.70107 17.268 9.12141 16.8599 8.95987L16.462 8.80237C16.3374 8.75305 16.2388 8.65407 16.1897 8.52902L16.0328 8.12967Z" className="stroke-white"/>
                            <path d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM7.37554 20.013C7.017 19.8056 6.5582 19.9281 6.3508 20.2866C6.14339 20.6452 6.26591 21.104 6.62446 21.3114L7.37554 20.013ZM2.68862 17.3755C2.89602 17.7341 3.35482 17.8566 3.71337 17.6492C4.07191 17.4418 4.19443 16.983 3.98703 16.6245L2.68862 17.3755ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6444 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447ZM12 21.25C10.3139 21.25 8.73533 20.7996 7.37554 20.013L6.62446 21.3114C8.2064 22.2265 10.0432 22.75 12 22.75V21.25ZM3.98703 16.6245C3.20043 15.2647 2.75 13.6861 2.75 12H1.25C1.25 13.9568 1.77351 15.7936 2.68862 17.3755L3.98703 16.6245Z" className="fill-white"/>
                        </svg>
                        <svg className="fill-backgroundColor-primary left-[6px] bottom-[14px] transition-[0.3s]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.28451 10.3333C7.10026 10.8546 7 11.4156 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C11.4156 7 10.8546 7.10026 10.3333 7.28451" stroke-width="1.5" stroke-linecap="round" className="stroke-backgroundColor-primary"/>
                            <path d="M12 2V4" stroke-width="1.5" stroke-linecap="round" className="stroke-backgroundColor-primary"/>
                            <path d="M12 20V22" stroke-width="1.5" stroke-linecap="round" className="stroke-backgroundColor-primary"/>
                            <path d="M4 12L2 12" stroke-width="1.5" stroke-linecap="round" className="stroke-backgroundColor-primary"/>
                            <path d="M22 12L20 12" stroke-width="1.5" stroke-linecap="round" className="stroke-backgroundColor-primary"/>
                            <path d="M19.7778 4.22266L17.5558 6.25424" stroke-width="1.5" stroke-linecap="round" className="stroke-backgroundColor-primary"/>
                            <path d="M4.22217 4.22266L6.44418 6.25424" stroke-width="1.5" stroke-linecap="round" className="stroke-backgroundColor-primary"/>
                            <path d="M6.44434 17.5557L4.22211 19.7779" stroke-width="1.5" stroke-linecap="round" className="stroke-backgroundColor-primary"/>
                            <path d="M19.7778 19.7773L17.5558 17.5551" stroke-width="1.5" stroke-linecap="round" className="stroke-backgroundColor-primary"/>
                        </svg>
                    </label>
                </div>
                <div className='md:hidden' onClick={openNavMenu}>
                    {!navMenuOpen ? <FontAwesomeIcon icon={faBars} className='w-5'/> : <FontAwesomeIcon icon={faXmark} className='w-5'/>}
                </div>
            </div>

            <ul className={navMenuOpen ? 'absolute bg-backgroundColor-primary w-full px-8' : 'hidden'}>
                <li className='border-b-2 border-zinc-300 w-full'>Dashboard</li>
                <li className='border-b-2 border-zinc-300 w-full'>Transactions</li>
                <li className='border-b-2 border-zinc-300 w-full'>Investments</li>
                <li className='border-b-2 border-zinc-300 w-full'>Linked Accounts</li>
                <li className='border-b-2 border-zinc-300 w-full'>Log Out</li>
                <div className='flex flex-col'>
                    <button className='px-8 py-3 mt-2 mb-2'>
                        Link Account
                    </button>
                    <button className='px-8 py-3' onClick={() => theme.handleThemeSwitch(theme.theme === 'dark' ? 'light' : 'dark')}>
                        {theme.theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </div>
            </ul>
        </nav>
    )
}

export default Navbar