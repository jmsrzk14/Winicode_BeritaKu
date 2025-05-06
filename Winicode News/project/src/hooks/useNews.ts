import { useState, useEffect } from 'react';
import type { NewsItem, NewsResponse } from '../types/news';
import { mainCategories, otherCategories } from '../constants/categories';

export function useNews(category: string = '') {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const isValidCategory = category === '' || [...mainCategories, ...otherCategories]
      .some(cat => cat.id === category);

    if (!isValidCategory) {
      setError('Kategori tidak valid');
      setNews([]);
      setLoading(false);
      return;
    }

    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const baseUrl = 'http://127.0.0.1:8000/news';
        const url = category ? `${baseUrl}/${category}` : baseUrl;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data: NewsResponse = await response.json();
        
        if (!data.data || data.data.length === 0) {
          setError('Tidak ada berita untuk kategori ini');
          setNews([]);
        } else {
          setNews(data.data);
        }
      } catch (err) {
        setError((err as Error).message);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  return { news, loading, error };
}