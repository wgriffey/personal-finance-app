import React from 'react';
import money from '../assets/images/money.png';
import { SIDEBAR_NAVIGATION_ITEMS, SIDEBAR_BOTTOM_ITEMS } from '../constants/SidebarItems';
import { SidebarItem } from '../interfaces/SidebarNavigationItem';
import { Link, useLocation } from 'react-router-dom';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQueryClient } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';

function Sidebar() {
    const query = useQueryClient();
    const location = useLocation();
    const [userToken, setUserToken, removeUserToken] = useCookies(['myToken']);


    function onLogOut(){
        query.removeQueries({queryKey: ['user']});
        removeUserToken('myToken');
    }

    return (
        <div className='relative hidden min-h-screen min-w-[15%] flex-col bg-backgroundColor-primary drop-shadow-lg md:flex'>
            <div className='flex items-center justify-center gap-1 px-3 py-[26px] text-textColor-primary'>
                <img src={money} className='h-6 w-6'></img>
                <h1 className='text-sm font-bold md:text-lg'>Gryffen Finance</h1>
            </div>
            <hr className='h-px border-0 bg-textColor-primary' />
            <div className='mt-2 flex-1 flex-col space-y-5 overflow-hidden'>
                {SIDEBAR_NAVIGATION_ITEMS.map((item: SidebarItem) => (
                    <Link
                        key={item.key}
                        to={item.path}
                        className={`flex items-center gap-2 px-3 py-2 text-base font-light text-textColor-secondary hover:bg-textColor-primary hover:no-underline ${
                            location.pathname === item.path
                                ? 'bg-textColor-primary bg-opacity-50 text-textColor-secondary'
                                : ''
                        }`}
                    >
                        <span>{item.icon}</span>
                        {item.label}
                    </Link>
                ))}
                <div className='flex flex-col'>
                    <button type='button' className='mb-2 mt-2 px-6 py-3'>
                        Link Account
                    </button>
                </div>
            </div>
            <hr className='h-px border-0 bg-textColor-primary' />
            <div className='mt-2'>
                {SIDEBAR_BOTTOM_ITEMS.map((item: SidebarItem) => (
                    <Link
                        key={item.key}
                        to={item.path}
                        className={`flex items-center gap-2 px-3 py-2 text-base font-light text-textColor-secondary hover:bg-textColor-primary hover:no-underline ${
                            location.pathname === item.path
                                ? 'bg-textColor-primary bg-opacity-50 text-textColor-secondary'
                                : ''
                        }`}
                    >
                        <span>{item.icon}</span>
                        {item.label}
                    </Link>
                ))}
                <div className='flex cursor-pointer items-center gap-2 px-3 py-2 text-base font-light text-red-600 hover:bg-red-600 hover:text-textColor-secondary hover:no-underline'
                onClick={onLogOut}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    Log Out
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
