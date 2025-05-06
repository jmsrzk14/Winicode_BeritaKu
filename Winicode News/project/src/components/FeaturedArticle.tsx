import React from 'react';
import type { NewsItem } from '../types/news';

interface FeaturedArticleProps {
  article: NewsItem;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <article className="relative bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3">
          <img
            src={article.image || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80'}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>
        <div className="md:w-1/3 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 line-clamp-3">
            {article.title}
          </h2>
          <p className="text-gray-600 mb-6 line-clamp-4">
            {article.description}
          </p>
          <div className="flex items-center justify-between mt-[7em] text-sm">
            <span className="text-gray-500">
              {new Date(article.isoDate).toLocaleDateString('id-ID')}
            </span>
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Lihat Detail
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}