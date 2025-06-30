import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import {
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
  Button, TablePagination, TextField, Dialog, DialogTitle, DialogContent, 
  DialogActions, DialogContentText
} from "@mui/material";
import { Eye, Pencil, Trash } from 'lucide-react';
import Swal from 'sweetalert2';

type Category = {
  ID: number;
  title: string;
  kategori_id: number;
};

interface Column {
  id: keyof Category; 
  label: string;
}

const columns: readonly Column[] = [
  { id: "title", label: "Judul Berita" },
  { id: "kategori_id", label: "Kategori" },
];

const CategoryContent = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const [nameCategory, setNameCategory] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categoriesList, setCategoriesList] = useState<{ ID: number, name: string }[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredCategory, setFilteredCategory] = useState<Category[]>([]);
  const navigate = useNavigate();

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
  
  const getCategoryName = (kategori_id: number) => {
    const category = categoriesList.find(cat => cat.ID === kategori_id);
    return category ? category.name : "Kategori tidak ditemukan";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/news");
        if (!response.ok) throw new Error("Data tidak ditemukan!");
        const data: Category[] = await response.json();
        setCategory(data);
        setFilteredCategory(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = category.filter((category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCategory(filtered);
    setPage(0);
  }, [searchQuery, category]);

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: `Data Kategori Berita akan dihapus secara permanen!`, 
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://127.0.0.1:8000/news/${id}`, {
            method: "DELETE",
          });
          if (!response.ok) {
            throw new Error("Gagal menghapus paket");
          }
          Swal.fire({
            title: 'Terhapus!',
            text: 'Data Berita berhasil dihapus.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
          }).then(() => {
            setCategory(prev => prev.filter(p => p.ID !== id));
            setFilteredCategory(prev => prev.filter(p => p.ID !== id));
          });
        } catch (error) {
          Swal.fire({
            title: 'Gagal!',
            text: (error as Error).message || 'Terjadi kesalahan saat menghapus.',
            icon: 'error',
            confirmButtonColor: '#d33',
          });
        }
      }
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const paginatedData = filteredCategory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="lg:static lg:w-auto p-6 content-wrapper bg-gray-50 min-h-screen sm:w-[37em] sm:sticky sm:left-[4em] sm:mt-[-1em]">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Daftar Berita</h1>
          <TextField
            label="Cari Berita"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Link to={`/dashboard/news/create`}>
          <Button variant="contained"
          sx={{
            backgroundColor: '#f59e0b',
            '&:hover': { backgroundColor: '#d97706' },
            color: 'white',
            height: '40px'
          }}> 
            Tambah Berita
          </Button>
        </Link>
      </div>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              {columns.map((column) => (
                <TableCell key={column.id} align="center">{column.label}</TableCell>
              ))}
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <p className="text-red-500">Data tidak ditemukan!</p>
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, index) => (
                <TableRow hover tabIndex={-1} key={row.ID}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell align="center" width="600px">{row.title} {row.ID}</TableCell>
                  <TableCell align="center">{getCategoryName(row.kategori_id)}</TableCell>
                  <TableCell align="center">
                    <Link to={`/dashboard/news/viewNews/${row.ID}`}>
                      <Button variant="contained" color="primary" size="small" sx={{ mr: 1, minWidth: 30 }}><Eye size={20} /></Button>
                    </Link>
                    <Link to={`/dashboard/news/editNews/${row.ID}`}>
                      <Button variant="contained" color="warning" size="small" sx={{ mr: 1, minWidth: 30 }}><Pencil size={20} /></Button>
                    </Link>
                    <Button variant="contained" color="error" size="small" sx={{ minWidth: 30 }} onClick={() => handleDelete(row.ID)}>
                      <Trash size={20} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredCategory.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Baris per halaman"
      />
    </div>
  );
};

export default CategoryContent;