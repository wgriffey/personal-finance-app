import money from '@assets/images/money.png';
import { SIDEBAR_NAVIGATION_ITEMS, SIDEBAR_BOTTOM_ITEMS } from '@constants/SidebarItems';
import { SidebarItem } from '@interfaces/SidebarNavigationItem';
import { Link, useLocation, useNavigate } from 'react-router';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useLink from '@plaid/hooks/useLink.ts';
import { useLogout } from '@auth/hooks/useLogout';

function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { generateLinkToken } = useLink();
    const logoutMutation = useLogout();

    function initiatePlaidLink() {
        generateLinkToken();
    }
    function onLogOut() {
        logoutMutation.mutate(undefined, {
            onSuccess: () => navigate('/login'),
        });
    }

    return (
        <div className='relative hidden h-screen min-w-[15%] flex-col bg-backgroundColor-primary drop-shadow-lg md:flex'>
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
                    <button
                        className='primary-button mb-2 mt-2 w-full'
                        onClick={() => initiatePlaidLink()}
                    >
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
                <div
                    className='flex cursor-pointer items-center gap-2 px-3 py-2 text-base font-light text-red-600 hover:bg-red-600 hover:text-textColor-secondary hover:no-underline'
                    onClick={onLogOut}
                >
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    Log Out
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
