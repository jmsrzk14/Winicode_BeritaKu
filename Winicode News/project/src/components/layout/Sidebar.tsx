import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Layers
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="fixed top-0 left-0 h-full w-[250px] bg-[#fef6f0] border-r border-gray-100 flex flex-col z-10">
      <div className="px-4 flex items-center justify-center">
        <Link to="/dashboard/home" className="flex items-center">
          <img 
            src="/news.png" 
            alt="Elegent Logo" 
            className="h-100 w-100 mb-[-2em] mt-[-1.5em]"
          />
        </Link>
      </div>
      
      <div className="flex flex-col flex-grow mt-6">
        <NavItem 
          icon={<Home size={20} />} 
          label="Home" 
          path="/dashboard/home" 
          isActive={location.pathname === "/dashboard/home"} 
        />
        <NavItem 
          icon={<Layers size={20} />} 
          label="Kategori" 
          path="/dashboard/category" 
          isActive={location.pathname === "/dashboard/category"} 
        />
        <NavItem 
          icon={<FileText size={20} />} 
          label="News" 
          path="/dashboard/news" 
          isActive={location.pathname === "/dashboard/news"} 
        />
      </div>
    </aside>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive?: boolean;
  hasDropdown?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, path, isActive, hasDropdown }) => {
  return (
    <Link 
      to={path}
      className={`flex items-center px-10 no-underline py-3 text-gray-700 hover:bg-[#ffefe1] transition-colors duration-200 ${
        isActive ? 'bg-[#ff8a3d] bg-opacity-10 text-[#ff8a3d] font-medium' : ''
      }`}
    >
      <div className={`${isActive ? 'text-[#ff8a3d]' : 'text-gray-500'}`}>
        {icon}
      </div>
      <span className="ml-3">{label}</span>
      {hasDropdown && (
        <svg 
          className="ml-auto w-4 h-4 text-gray-500" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      )}
    </Link>
  );
};

export default Sidebar;
