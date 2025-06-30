import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import SummernoteEditor from '../../components/SummerNote';
import DOMPurify from 'dompurify';

interface Category {
  ID: number;
  name: string;
}

interface NewsItem {
  ID: number;
  title: string;
  date: string;
  image: string;
  description: string;
  kategori_id: number;
}

const EditBerita = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();
  const editorContentRef = useRef<() => Promise<string>>(() => Promise.resolve(''));

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/category');
        if (!response.ok) throw new Error('Gagal memuat kategori');
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Gagal memuat kategori:', error);
        Swal.fire({
          title: 'Gagal!',
          text: 'Tidak dapat memuat daftar kategori.',
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK',
        });
      }
    };
    fetchCategories();
  }, []);

  // Ambil data berita
  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/news/${id}`);
        if (!response.ok) throw new Error('Gagal mengambil data berita');
        const data: { message: NewsItem } = await response.json();
        const berita = data.message;
        console.log('Data berita dari API:', berita); // Debug log
        setTitle(berita.title);
        setDescription(berita.description || ''); // Pastikan description adalah string
        setDate(berita.date);
        setCategory(berita.kategori_id.toString());
        setCurrentImage(berita.image);
      } catch (error) {
        console.error('Error saat mengambil berita:', error);
        Swal.fire({
          title: 'Gagal!',
          text: 'Gagal mengambil data berita.',
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK',
        });
      }
    };
    fetchBerita();
  }, [id]);

  const sanitizedDescription = DOMPurify.sanitize(description);

  const handleDescriptionChange = (content: string) => {
    console.log('Konten Summernote berubah:', content); // Debug log
    setDescription(content);
  };

  // Handler untuk pengiriman formulir
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', await editorContentRef.current());
    formData.append('date', date);
    formData.append('kategori_id', category);
    if (image) formData.append('image', image);

    console.log('Data formulir:', Object.fromEntries(formData));

    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data berita akan diperbarui.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#333',
      confirmButtonText: 'Ya, Simpan!',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://127.0.0.1:8000/news/${id}`, {
            method: 'PUT',
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Gagal memperbarui berita');
          }

          Swal.fire({
            title: 'Berhasil!',
            text: 'Data berita berhasil diperbarui.',
            icon: 'success',
            confirmButtonColor: '#333',
            confirmButtonText: 'OK',
          }).then(() => {
            navigate('/dashboard/news');
          });
        } catch (error) {
          Swal.fire({
            title: 'Gagal!',
            text: (error as Error).message || 'Terjadi kesalahan saat menyimpan data.',
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
          });
        }
      }
    });
  };

  return (
    <div className="lg:static lg:w-auto p-6 content-wrapper bg-gray-50 min-h-screen sm:w-[37em] sm:sticky sm:left-[4em] sm:mt-[-1em]">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Perbarui Berita</h1>
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
            onChange={handleDescriptionChange}
            getContentRef={(fn) => {
              editorContentRef.current = fn;
            }}
            placeholder="Masukkan deskripsi berita..."
          />
          {!description && (
            <p className="text-gray-500 text-sm mt-1">Tidak ada deskripsi tersedia.</p>
          )}
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
          <label className="block text-sm font-medium text-gray-700">Foto Saat Ini</label>
          {currentImage ? (
            <img
              src={`http://127.0.0.1:8000/storage/${currentImage}`}
              alt="Foto saat ini"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          ) : (
            <p className="text-gray-500 text-sm mt-1">Tidak ada foto tersedia.</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ganti Foto</label>
          <input
            type="file"
            className="mt-1 p-2 border rounded w-full"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            accept="image/*"
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

export default EditBerita;