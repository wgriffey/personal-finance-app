import Header from './Header';
import { Outlet } from 'react-router-dom';
import { ThemeProp } from '../../interfaces/ThemeProps';
import Sidebar from './Sidebar';

function Layout(theme: ThemeProp) {
    return (
        <div className='flex h-[100dvh] min-w-full flex-row overflow-hidden'>
            <Sidebar />
            <div className='flex min-w-full flex-col md:min-w-[85%]'>
                <Header theme={theme.theme} handleThemeSwitch={theme.handleThemeSwitch} />
                <div className='flex h-screen flex-col overflow-auto'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Layout;
