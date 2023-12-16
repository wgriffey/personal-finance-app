import Header from './Header';
import { Outlet } from 'react-router-dom';
import { ThemeProp } from '../../interfaces/ThemeProps';
import Sidebar from './Sidebar';

function Layout(theme: ThemeProp) {
    return (
        <div className='flex flex-row min-h-[100dvh] min-w-full bg-blue-500'>
            <Sidebar />
            <div className='flex flex-col min-w-full md:min-w-[85%]'>
                <Header theme={theme.theme} handleThemeSwitch={theme.handleThemeSwitch} />
                <Outlet />
            </div>
        </div>
  );
}

export default Layout