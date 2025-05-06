import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

interface NavbarProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, sidebarOpen }: NavbarProps) => {
  return (
    <nav className={` main-header navbar navbar-expand navbar-white ml-[18em] navbar-light transition-all duration-300 ${sidebarOpen ? "lg:ml-[200em] ml-20" : "ml-20"}`}>
      <ul className="navbar-nav ml-2">
        <li className="nav-item">
          <button   
            className="nav-link" 
            onClick={toggleSidebar}
            style={{ cursor: 'pointer', border: 'none', background: 'none' }}
          >
            <i className="fas fa-bars"></i>
          </button>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto mr-5">
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer">
          <User size={20} className="text-white" />
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;