import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const LihatBerita = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [date, setDate] = useState('');
  const [kategori, setKategori] = useState(0);
  const [categoriesList, setCategoriesList] = useState<{ ID: number, name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/category");
        if (!response.ok) throw new Error("Gagal memuat kategori!");
        const data = await response.json();
        setCategoriesList(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);
    
  const getCategoryName = (kategori: number) => {
    const category = categoriesList.find(cat => cat.ID === kategori);
    return category ? category.name : "Kategori tidak ditemukan";
  };
  
  useEffect(() => {
    const fetchPaket = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`http://127.0.0.1:8000/news/${id}`);
        if (!response.ok) throw new Error('Gagal mengambil data paket');
        const data = await response.json();

        setTitle(data.message.title);
        setDeskripsi(data.message.description);
        setDate(data.message.date);
        setKategori(data.message.kategori_id);
      } catch (error) {
        console.error("Error fetching paket:", error);
        setError('Gagal memuat data. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPaket();
    }
  }, [id]);

  if (loading) return <div className="p-6 text-center">Memuat data...</div>;
  if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6 content-wrapper bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{title}</h1>
      <div className="bg-gray-100 p-4 rounded-md space-y-4">
        <div
          className="mt-1 p-2 border rounded w-full bg-white"
          dangerouslySetInnerHTML={{ __html: deskripsi }}
        />
        <p><strong> {getCategoryName(kategori)}</strong></p>
        <p><strong> {new Date(date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</strong></p>
      </div>
    </div>
  );
};

export default LihatBerita;
