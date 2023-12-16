import React from 'react';
import money from '../../assets/images/money.png';
import { SIDEBAR_NAVIGATION_ITEMS } from '../../constants/SidebarNavigationItems';
import { SidebarNavigationItem } from '../../interfaces/SidebarNavigationItem';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className='hidden md:flex flex-col min-w-[15%] bg-textColor-accent border-none'>
        <div className='flex items-center justify-center gap-2 px-3 py-[26px] bg-textColor-accent'>
            <img src={money} className='h-6 w-6'></img>
            <h1 className='text-sm font-bold md:text-lg'>Personal Finance App</h1>
        </div>
        <hr className='text-textColor-primary'/>
        <div className='flex-shrink flex-1 items-center justify-center space-y-5'>
            {SIDEBAR_NAVIGATION_ITEMS.map((item: SidebarNavigationItem) => (
                <Link key={item.key} to={item.path} className='flex items-center gap-2 font-light px-3 py-2 hover:bg-textColor-primary hover:no-underline active:bg-neutral-600 text-base'>
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
        <div>Bottom</div>
    </div>
  )
}

export default Sidebar