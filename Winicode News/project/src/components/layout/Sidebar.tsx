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
    <aside className="fixed top-0 left-0 h-full w-[70px] md:w-[250px] bg-[#fef6f0] border-r border-gray-100 flex flex-col z-10 transition-all duration-300">
      <div className="px-4 flex items-center justify-center py-4">
        <Link to="/dashboard/home" className="flex items-center justify-center">
          <img 
            src="/news.png" 
            alt="Elegent Logo" 
            className="lg:relative lg:h-[100px] lg:w-[150px] lg:mb-[-2em] lg:mt-[-1.5em] sm:absolute"
          />
        </Link>
      </div>
      <div className="flex flex-col flex-grow mt-6 space-y-2">
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
          isActive={
            location.pathname === "/dashboard/category" ||
            location.pathname.startsWith("/dashboard/category/create") ||
            location.pathname.startsWith("/dashboard/category/editCategory/:id")
          }
        />
        <NavItem 
          icon={<FileText size={20} />} 
          label="News" 
          path="/dashboard/news" 
          isActive={
            location.pathname === "/dashboard/news" ||
            location.pathname === "/dashboard/news/create" ||
            location.pathname.startsWith("/dashboard/news/editNews/") ||
            location.pathname.startsWith("/dashboard/news/viewNews/")
          }
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
      className={`flex items-center px-4 md:px-10 no-underline py-3 text-gray-700 hover:bg-[#ffefe1] transition-colors duration-200 ${
        isActive ? 'bg-[#ff8a3d] bg-opacity-10 text-[#ff8a3d] font-medium' : ''
      }`}
    >
      <div className={`${isActive ? 'text-[#ff8a3d]' : 'text-gray-500'}`}>
        {icon}
      </div>
      <span className="ml-3 hidden md:inline">{label}</span>
      
      {hasDropdown && (
        <svg 
          className="ml-auto w-4 h-4 text-gray-500 hidden md:block" 
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
