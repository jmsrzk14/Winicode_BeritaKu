import React from 'react';
import type { NewsItem } from '../types/news';

interface ArticleCardProps {
  article: NewsItem;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={article.image || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80'}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {article.description}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{new Date(article.isoDate).toLocaleDateString('id-ID')}</span>
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Baca Selengkapnya
          </a>
        </div>
      </div>
    </article>
  );
}