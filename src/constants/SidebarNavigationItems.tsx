import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SidebarNavigationItem } from "../interfaces/SidebarNavigationItem";
import { faFile, faHouse, faLink, faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons';

export const SIDEBAR_NAVIGATION_ITEMS: SidebarNavigationItem[] = [
    {
        key: 'homeDashboard',
        label: 'Home Dashboard',
        path: '/home',
        icon: <FontAwesomeIcon icon={faHouse} />
    },
    {
        key: 'transactions',
        label: 'Transactions',
        path: '/transactions',
        icon: <FontAwesomeIcon icon={faFile} />
    },
    {
        key: 'investments',
        label: 'Investments',
        path: '/investments',
        icon: <FontAwesomeIcon icon={faMoneyBillTrendUp} />
    },
    {
        key: 'linkedAccounts',
        label: 'Linked Accounts',
        path: '/linked-accounts',
        icon: <FontAwesomeIcon icon={faLink} />
    },
    

]