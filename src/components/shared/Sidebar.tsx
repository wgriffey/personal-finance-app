import React from 'react';
import money from '../../assets/images/money.png';
import { SIDEBAR_NAVIGATION_ITEMS, SIDEBAR_BOTTOM_ITEMS } from '../../constants/SidebarItems';
import { SidebarItem } from '../../interfaces/SidebarItem';
import { Link, useLocation } from 'react-router-dom';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Sidebar() {
    const location = useLocation();

    return (
        <div className='hidden md:flex relative flex-col min-w-[15%] min-h-screen bg-textColor-accent'>
            <div className='flex items-center justify-center gap-1 px-3 py-[26px] bg-textColor-accent'>
                <img src={money} className='h-6 w-6'></img>
                <h1 className='text-sm font-bold md:text-lg'>Personal Finance App</h1>
            </div>
            <hr className='text-textColor-primary'/>
            <div className='flex-1 flex-col space-y-5 mt-2 overflow-hidden'>
                {SIDEBAR_NAVIGATION_ITEMS.map((item: SidebarItem) => (
                    <Link key={item.key} to={item.path} className={`flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline text-base ${location.pathname === item.path ? 'text-white bg-neutral-700' : ''}`}>
                        <span>{item.icon}</span>
                        {item.label}
                    </Link>
                ))}
                <div className='flex flex-col'>
                    <button className='px-6 py-3 mt-2 mb-2'>
                        Link Account
                    </button>
                </div>
            </div>
            <hr className='text-textColor-primary'/>
            <div className='mt-2'>
                {SIDEBAR_BOTTOM_ITEMS.map((item: SidebarItem) => (
                    <Link key={item.key} to={item.path} className={`flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline text-base ${location.pathname === item.path ? 'text-white bg-neutral-700' : ''}`}>
                        <span>{item.icon}</span>
                        {item.label}
                    </Link>
                ))}
                <div className='flex items-center gap-2 font-light px-3 py-2 cursor-pointer hover:bg-backgroundColor-primary hover:no-underline text-base text-red-600'>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    Log Out
                </div>
            </div>
        </div>
    )
}

export default Sidebar