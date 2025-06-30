import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditPaket = () => {
  const { id } = useParams(); 
  const [nama, setNama] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaket = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/category/${id}`);
        if (!response.ok) throw new Error('Gagal mengambil data paket');
        const data = await response.json();
        console.log("Data dari API:", data);
        setNama(data.message.name);
      } catch (error) {
        console.error("Error fetching paket:", error);
      }
    };

    fetchPaket();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("name", nama);

    console.log("Payload yang dikirim:", formData.toString());

    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data Kategori tidak akan dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#333',
      confirmButtonText: 'Ya, Edit!',
      cancelButtonText: 'Batal'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://127.0.0.1:8000/category/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
          });

          if (!response.ok) {
            throw new Error("Gagal mengedit Kategori");
          }
  
          Swal.fire({
            title: 'Berhasil!',
            text: 'Data Kategori berhasil diubah.',
            icon: 'success',
            confirmButtonColor: '#333',
          }).then(() => {
            navigate('/dashboard/category');
          });
  
        } catch (error) {
          Swal.fire({
            title: 'Gagal!',
            text: (error as Error).message || 'Terjadi kesalahan saat menghapus.',
            icon: 'error',
            confirmButtonColor: '#d3085d6',
          });
        }
      }
    });
  };

  return (
    <div className="p-6 content-wrapper bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Update Kategori</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Kategori</label>
          <input
            type="text"
            className="mt-1 p-2 border rounded w-full"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md"
        >
          Simpan
        </button>
      </form>
    </div>
  );
};

export default EditPaket;
