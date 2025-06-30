import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SummernoteEditor from '../../components/SummerNote';
import DOMPurify from 'dompurify';

interface Category {
  ID: number;
  name: string;
}

const TambahBerita = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const editorContentRef = useRef<() => Promise<string>>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/category');
        if (!response.ok) {
          throw new Error('Gagal memuat kategori');
        }
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Gagal memuat kategori:', error);
        Swal.fire({
          title: 'Gagal!',
          text: 'Tidak dapat memuat kategori.',
          icon: 'error',
          confirmButtonColor: '#d33',
        });
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      Swal.fire({
        title: 'Gagal!',
        text: 'Mohon pilih gambar sebelum mengirim.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
      return;
    }

    const currentDescription = (await editorContentRef.current?.()) || description;

    const formData = new FormData();
    formData.append('name', title);
    formData.append('description', currentDescription);
    formData.append('date', date);
    formData.append('category_id', category);
    formData.append('image', image);

    try {
      const response = await fetch('http://127.0.0.1:8000/news/create', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      Swal.fire({
        title: 'Berhasil!',
        text: 'Data Berita berhasil ditambahkan.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        navigate('/dashboard/news');
      });
    } catch (error) {
      Swal.fire({
        title: 'Gagal!',
        text: (error as Error).message || 'Terjadi kesalahan saat menambahkan.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    }
  };

  const sanitizedDescription = DOMPurify.sanitize(description);

  return (
    <div className="lg:static lg:w-auto p-6 content-wrapper bg-gray-50 min-h-screen sm:w-[37em] sm:sticky sm:left-[4em] sm:mt-[-1em]">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tambah Berita</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Judul Berita</label>
          <input
            type="text"
            className="mt-1 p-2 border rounded w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
          <SummernoteEditor
            value={description}
            onChange={setDescription}
            getContentRef={(fn) => {
              editorContentRef.current = fn;
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tanggal</label>
          <input
            type="date"
            className="mt-1 p-2 border rounded w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Kategori</label>
          <select
            className="mt-1 p-2 border rounded w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Pilih Kategori</option>
            {categories.map((cat) => (
              <option key={cat.ID} value={cat.ID}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Foto</label>
          <input
            type="file"
            className="mt-1 p-2 border rounded w-full"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            accept="image/*"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-amber-700 hover:bg-amber-800 text-white px-3 py-2 rounded-md"
        >
          Simpan
        </button>
      </form>
    </div>
  );
};

export default TambahBerita;