import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import { useNews } from './hooks/useNews';
import { Header } from './components/Header';
import { NewsDetail } from './components/NewDetail';
import { Login } from './pages/Login';
import CategoryContent from './pages/category/index';
import TambahKategori from './pages/category/create';
import { Register } from './pages/Register';
import { FeaturedArticle } from './components/FeaturedArticle';
import Dashboard from './pages/Dashboard';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

import 'admin-lte/dist/css/adminlte.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';

function HomePage() {
  const [activeCategory, setActiveCategory] = useState('');
  const { news, loading, error } = useNews(activeCategory);
  const latestNews = news.slice(1);
  const [visibleCount, setVisibleCount] = useState(10);

  return (
    <>
      <Header 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden mb-8 justify-center px-4 lg:px-0">
          <div className="flex flex-col items-center justify-center text-sm">
            <img 
              src="/news.png" 
              alt="Logo"
              className="w-[20em] sm:w-30 md:w-30 lg:w-[26em] h-auto object-cover mb-[-2em]" 
            />
             <p className="text-gray-600 mb-[2em] lg:text-[1.3em] md:text-md sm:text-md sm:px-6 text-center leading-relaxed tracking-wide font-poppins">
                BeritaKu adalah portal berita terpercaya yang menyajikan berbagai berita menarik dari berbagai sumber kredibel. Dengan beragam kategori mulai dari politik, ekonomi, fenomena, teknologi dan lain-lain.
             </p>
          </div>
        </div>
        
        <p className="text-black mb-[1em] lg:text-[2em] md:text-[1.5em] sm:text-[1.5em] sm:px-6 font-poppins">
          Berita {activeCategory}
        </p>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-red-500 border-t-transparent"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* News Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.slice(0, visibleCount).map((item) => (
              <article key={item.title} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 hover:scale-105 duration-200">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover hover:scale-110 duration-200"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2 line-clamp-2 hover:text-red-700 transition-colors duration-200">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{item.contentSnippet}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {new Date(item.isoDate).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <a
                      href={`/news/${encodeURIComponent(item.title)}`}
                      className="text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
                    >
                      Baca Selengkapnya
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {visibleCount < latestNews.length && (
        <button
          onClick={() => setVisibleCount((prev) => prev + 10)}
          className="mt-6 px-4 py-2 bg-gray-500 text-white font-semibold rounded-[100px] hover:bg-blue-600 mb-5 lg:ml-[3em] sm:ml-[2em] ml-4"
        >
          Tampilkan Lebih Banyak
        </button>
      )}
    </>
  );
}

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [notificationCount] = useState(3);

  return (
    <div className="flex min-h-screen bg-[#f9f9f9]">
      <Sidebar />
      
      <div className="flex flex-col flex-1 mt-[5em]">
        <Navbar username="Aiden Max" notificationCount={notificationCount} />

        <main className="flex-1">
          {children}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-gray-100">
            <HomePage />
            <footer className="bg-gray-900 text-white py-12">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Link to="/">
                    <img 
                      src="/news.png" 
                      alt="Logo"
                      className="w-[170px] sm:w-50 md:w-20 lg:w-60 h-auto object-cover" 
                    />
                  </Link>
                  <div>
                    <h3 className="text-xl font-bold mb-4">Tentang Kami</h3>
                    <p className="text-gray-400">Portal berita terpercaya yang menyajikan informasi aktual dan terkini dari berbagai kategori</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">Hubungi Kami</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li>Email: redaksi@beritakita.id</li>
                      <li>Telepon: (021) 555-0123</li>
                      <li>Alamat: Jl. Sudirman No. 123, Jakarta Pusat</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
                  <p>© 2025 Berita Kita. Data berita disediakan oleh Antara News.</p>
                </div>
              </div>
            </footer>
          </div>
        } />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/home" element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        } />
        <Route path="/dashboard/category" element={
          <DashboardLayout>
            <CategoryContent />
          </DashboardLayout>
        } />
        <Route path="/dashboard/category/create" element={
          <DashboardLayout>
            <TambahKategori />
          </DashboardLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;