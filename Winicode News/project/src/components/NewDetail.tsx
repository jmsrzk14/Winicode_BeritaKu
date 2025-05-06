import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNews } from '../hooks/useNews';
import { ArrowLeft } from 'lucide-react';

export function NewsDetail() {
  const { id } = useParams();
  const { news, loading, error } = useNews();
  
  const article = news.find(item => item.title === decodeURIComponent(id || ''));

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <p className="text-red-700">Berita tidak ditemukan</p>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <Link 
        to="/" 
        className="inline-flex items-center text-red-600 hover:text-red-800 mb-6 transition-colors duration-200"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Kembali ke Beranda
      </Link>
      
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      
      <div className="mb-6 text-gray-600">
        <time dateTime={article.isoDate}>
          {new Date(article.isoDate).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>
      </div>

      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-[400px] object-cover rounded-lg mb-8"
        />
      )}

      <div className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: article.content || '' }} 
             className="text-gray-800 leading-relaxed space-y-4" />
      </div>

      <p className="text-gray-600 mb-[2em] lg:text-[1.3em] md:text-md sm:text-md sm:px-6 text-center leading-relaxed tracking-wide font-poppins">
        {article.description}
      </p>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Sumber Berita</h2>
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 hover:text-red-800 transition-colors duration-200"
        >
          Baca artikel asli di situs sumber
        </a>
      </div>
    </article>
  );
}