import Header from './Header';
import { Outlet } from 'react-router-dom';
import { ThemeProp } from '../../interfaces/ThemeProps';
import Sidebar from './Sidebar';

function Layout(theme: ThemeProp) {
    return (
        <div className='flex h-[100dvh] w-[100dwh] flex-row overflow-hidden bg-backgroundColor-secondary'>
            <Sidebar />
            <div className='flex min-w-full flex-col md:min-w-[85%]'>
                <Header theme={theme.theme} handleThemeSwitch={theme.handleThemeSwitch} />
                <div className='flex h-full w-full flex-col overflow-auto'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Layout;
