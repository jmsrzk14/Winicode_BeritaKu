import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Newspaper } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }: SidebarProps) => {
  return (
    <aside className={`fixed top-0 left-0 h-full w-[13em] bg-gray-800 transition-all duration-300 ${ isOpen ? 'lg:w-[13em] w-20' : 'w-[4em]' }`} style={{ background: '#343a40' }}>
      <div className="flex flex-row w-100 mt-[-1em] justify-center border-b">
        <Link to="/dashboard/home" className="brand-link">
          <img 
            src={isOpen ? "/news.png" : "/winicode1.png"} 
            alt="AdminLTE Logo" 
            className={` brand-image img-circle elevation-3 w-[13em] ${isOpen ? 'lg:block hidden' : 'w-[3em] mt-[1.4em] mb-[0.4em]'} `}
            style={{ opacity: 0.8 }} 
          />
        </Link>
      </div>
      <div className="sidebar">
        {/* <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img 
              // src="https://adminlte.io/themes/v3/dist/img/user2-160x160.jpg" 
              className="img-circle elevation-2" 
              alt="User Image" 
            />
          </div>
          <div className="info">
            <Link to="/profile" className="d-block">Alexander Pierce</Link>
          </div>
        </div> */}

        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-col ml-1 mr-1">
            <li className="nav-item menu-open w-100 mb-1">
              <Link to="/dashboard/home" className={` flex flex-row items-center no-underline h-[3em] px-[1em] ${isOpen ? '' : 'lg:justify-center px-0'}`} style={{ background: "#0062cc", borderRadius: "5px" }}>
                <Home size={24} className={` text-white ${isOpen ? 'lg:mr-2' : 'lg:mr-0'}`} />
                <p className={` m-0 text-white text-md ${isOpen ? 'lg:block hidden' : 'lg:hidden'}`}>
                  Dashboard
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/widgets" className="flex flex-row items-center no-underline h-[3em]" style={{ padding: "0.5rem 1rem", borderRadius: "5px" }}>
                <Newspaper size={24} className='mr-2 text-white' />
                <p className={` m-0 text-white text-md ${isOpen ? 'lg:block hidden' : 'lg:hidden'}`}>
                  News
                </p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;