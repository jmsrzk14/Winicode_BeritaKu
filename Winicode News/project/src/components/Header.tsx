import { useState } from 'react';
import { Search, Menu, X, ChevronDown, User } from 'lucide-react';
import { mainCategories, otherCategories } from '../constants/categories';
import { NavLink } from "react-router-dom";

interface HeaderProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function Header({ activeCategory, onCategoryChange }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOtherMenuOpen, setIsOtherMenuOpen] = useState(false);

  const handleCategoryClick = (categoryId: string, e: React.MouseEvent) => {
    e.preventDefault();
    onCategoryChange(categoryId);
    setIsMobileMenuOpen(false);
    setIsOtherMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button 
              className="p-2 hover:bg-gray-100 rounded-lg md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <img 
              src="/news.png" 
              alt="Logo"
              className="w-[170px] sm:w-50 md:w-20 lg:w-60 h-auto object-cover" 
            />
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {mainCategories.map((category) => (
              <a
                key={category.id}
                href={`/${category.id}`}
                onClick={(e) => handleCategoryClick(category.id, e)}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeCategory === category.id
                    ? 'text-red-700 font-semibold'
                    : 'text-gray-600 hover:text-red-700'
                }`}
              >
                {category.label}
              </a>
            ))}
            <div className="relative">
              <button
                className="flex items-center text-gray-600 hover:text-red-700 px-3 py-2 text-sm font-medium"
                onClick={() => setIsOtherMenuOpen(!isOtherMenuOpen)}
                onBlur={() => setTimeout(() => setIsOtherMenuOpen(false), 200)}
              >
                Lainnya
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {isOtherMenuOpen && (
                <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[160px] z-50">
                  {otherCategories.map((category) => (
                    <a
                      key={category.id}
                      href={`/${category.id}`}
                      onClick={(e) => handleCategoryClick(category.id, e)}
                      className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                        activeCategory === category.id
                          ? 'text-red-700 bg-red-50 font-semibold'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-red-700'
                      }`}
                    >
                      {category.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari berita..."
                className="w-40 sm:w-[10em] sm:mr-[-10em] lg:mr-0 pl-10 pr-4 py-1.5 rounded-lg border border-gray-300 focus:outline-none focus:border-black text-sm"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
              
              {isSearchFocused && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto z-50">
                  <div className="p-3">
                    <p className="text-sm text-gray-500">
                      Mencari "{searchQuery}"...
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <NavLink to="/login">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center cursor-pointer">
              <User size={20} className="text-white" />
            </div>
          </NavLink>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`
        fixed inset-0 bg-gray-800 bg-opacity-50 z-40 md:hidden transition-opacity duration-300
        ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `} onClick={() => setIsMobileMenuOpen(false)}>
        <div 
          className={`
            fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-red-700">Menu</h2>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav>
              {mainCategories.map((category) => (
                <a
                  key={category.id}
                  href={`/${category.id}`}
                  onClick={(e) => handleCategoryClick(category.id, e)}
                  className={`block py-3 border-b border-gray-100 transition-colors duration-200 ${
                    activeCategory === category.id
                      ? 'text-red-700 font-semibold'
                      : 'text-gray-600 hover:text-red-700'
                  }`}
                >
                  {category.label}
                </a>
              ))}
              <div className="py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-500 mb-2">Kategori Lainnya</p>
                {otherCategories.map((category) => (
                  <a
                    key={category.id}
                    href={`/${category.id}`}
                    onClick={(e) => handleCategoryClick(category.id, e)}
                    className={`block py-2 pl-4 text-sm transition-colors duration-200 ${
                      activeCategory === category.id
                        ? 'text-red-700 font-semibold'
                        : 'text-gray-600 hover:text-red-700'
                    }`}
                  >
                    {category.label}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}