import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import money from '../assets/images/money.png'

function Navbar() {
    const [navMenuOpen, setNavMenuOpen] = useState<boolean>(false);

    function openNavMenu(){
       setNavMenuOpen(navMenuOpen => !navMenuOpen); 
    }

    return (
        <nav className='w-full h-[80px] z-0 bg-zinc-200 sticky drop-shadow-lg top-0'>
            <div className='px-2 flex justify-between items-center w-full h-full'>
                <div className='flex items-center'>
                    <img src={money} width={40}></img>
                    <h1 className='text-3xl font-bold mr-5 md:text-4xl'>Personal Finance App</h1>
                    <ul className='hidden md:flex mt-1'>
                        <li>Dashboard</li>
                        <li>Transactions</li>
                        <li>Investments</li>
                        <li>Linked Accounts</li>
                        <li>Log Out</li>
                    </ul>
                </div>
                <div className='hidden md:flex pr-4'>
                    <button className='px-8 py-3'>
                        Link Account
                    </button>
                </div>
                <div className='md:hidden' onClick={openNavMenu}>
                    {!navMenuOpen ? <FontAwesomeIcon icon={faBars} className='w-5'/> : <FontAwesomeIcon icon={faXmark} className='w-5'/>}
                </div>
            </div>

            <ul className={navMenuOpen ? 'absolute bg-zinc-200 w-full px-8' : 'hidden'}>
                <li className='border-b-2 border-zinc-300 w-full'>Dashboard</li>
                <li className='border-b-2 border-zinc-300 w-full'>Transactions</li>
                <li className='border-b-2 border-zinc-300 w-full'>Investments</li>
                <li className='border-b-2 border-zinc-300 w-full'>Linked Accounts</li>
                <li className='border-b-2 border-zinc-300 w-full'>Log Out</li>
                <button className='px-8 py-3 mt-2 mb-2'>
                        Link Account
                </button>
            </ul>
        </nav>
    )
}

export default Navbar