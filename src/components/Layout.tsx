import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#221916] relative">
      {/* Fixed Sidebar */}
      <Sidebar />
      
      {/* Main Content Area with left margin for sidebar */}
      <div className="ml-[248px] min-h-screen flex flex-col">
        {/* Header */}
        <div className="h-[104px] flex-shrink-0">
          <Header />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto bg-[#232222]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;