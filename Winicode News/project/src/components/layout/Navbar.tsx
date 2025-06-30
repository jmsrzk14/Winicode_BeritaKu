import React, { useState } from 'react';
import { ChevronDown, User } from 'lucide-react';

interface NavbarProps {
  username: string;
  notificationCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ }) => {

  return (
    <nav className="fixed top-0 right-0 h-16 flex items-center justify-between px-6 lg:ml-[250px] sm:ml-0 bg-[#fef6f0] border-b border-gray-100 z-50 lg:w-[calc(100%-250px)] sm:w-[calc(129%-250px)]">
      <h1 className="text-xl font-semibold text-gray-800">BeritaKu</h1>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center ml-2">
          <div className="ml-2 flex items-center">
            <span className="text-sm font-medium text-gray-800">
              <User size={20} className="ml-1 text-gray-500" />
            </span>
            <ChevronDown size={16} className="ml-1 text-gray-500 mr-3" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;