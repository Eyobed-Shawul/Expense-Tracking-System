import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    LuLogOut,
} from 'react-icons/lu';


export const SIDE_MENU_DATA = [
    {
        id: 1,
        title: 'Dashboard',
        icon: LuLayoutDashboard,
        path: '/dashboard',
    },
    {
        id: 2,
        title: 'Income',
        icon: LuWalletMinimal,
        path: '/income',
    },
    {
        id: 3,
        title: 'Expense',
        icon: LuHandCoins,
        path: '/expense',
    },
    {
        id: 4,
        title: 'Logout',
        icon: LuLogOut,
        path: '/logout',
    },
];