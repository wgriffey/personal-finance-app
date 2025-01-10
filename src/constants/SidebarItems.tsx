import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SidebarItem } from '@interfaces/SidebarNavigationItem';
import {
    faCircleQuestion,
    faFile,
    faGear,
    faHouse,
    faLink,
    faMoneyBillTrendUp,
} from '@fortawesome/free-solid-svg-icons';

export const SIDEBAR_NAVIGATION_ITEMS: SidebarItem[] = [
    {
        key: 'Dashboard',
        label: 'Dashboard',
        path: '/dashboard',
        icon: <FontAwesomeIcon icon={faHouse} />,
    },
    {
        key: 'transactions',
        label: 'Transactions',
        path: '/transactions',
        icon: <FontAwesomeIcon icon={faFile} />,
    },
    {
        key: 'investments',
        label: 'Investments',
        path: '/investments',
        icon: <FontAwesomeIcon icon={faMoneyBillTrendUp} />,
    },
    {
        key: 'linkedAccounts',
        label: 'Linked Accounts',
        path: '/linked-accounts',
        icon: <FontAwesomeIcon icon={faLink} />,
    },
];

export const SIDEBAR_BOTTOM_ITEMS: SidebarItem[] = [
    {
        key: 'settings',
        label: 'Settings',
        path: 'settings',
        icon: <FontAwesomeIcon icon={faGear} />,
    },
    {
        key: 'support',
        label: 'Help & Support',
        path: '/support',
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    },
];
