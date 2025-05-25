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
  id: number;
  kategori: string;
};

interface Column {
  id: keyof Category; 
  label: string;
}

const columns: readonly Column[] = [
  { id: "kategori", label: "Kategori Berita" },
];

const CategoryContent = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const [nameCategory, setNameCategory] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredCategory, setFilteredCategory] = useState<Category[]>([]);
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNameCategory("");
  };

  const handleSaveCategory = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/category/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: nameCategory }),
      });

      const data = await response.json();
      console.log("Data yang dikirim:", { nameCategory });
      console.log("Server Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Terjadi kesalahan");
      }

      setCategory(prev => [...prev, data]);
      setFilteredCategory(prev => [...prev, data]);
      Swal.fire("Berhasil!", "Kategori berhasil ditambahkan.", "success").then(() => {
        navigate("/dashboard/category");
        window.location.reload();
      });
      handleCloseDialog();
    } catch (error) {
      Swal.fire("Gagal", (error as Error).message, "error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/admin/listPacket");
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
      category.kategori.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCategory(filtered);
    setPage(0);
  }, [searchQuery, category]);

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data Kategori Berita akan dihapus secara permanen!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:8000/admin/listPacket/${id}`, {
            method: "DELETE",
            credentials: "include",
          });
          if (!response.ok) {
            throw new Error("Gagal menghapus paket");
          }
          Swal.fire({
            title: 'Terhapus!',
            text: 'Data Kategori Berita berhasil dihapus.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
          }).then(() => {
            setCategory(prev => prev.filter(p => p.id !== id));
            setFilteredCategory(prev => prev.filter(p => p.id !== id));
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
    <div className="p-6 content-wrapper bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Daftar Kategori Berita</h1>
          <TextField
            label="Cari Kategori Berita"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button 
          onClick={handleOpenDialog}
          variant="contained"
          sx={{
            backgroundColor: '#f59e0b',
            '&:hover': { backgroundColor: '#d97706' },
            color: 'white',
            height: '40px'
          }}
        >
          Tambah Kategori
        </Button>
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
                <TableRow hover tabIndex={-1} key={row.id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell align="center">{row.kategori}</TableCell>
                  <TableCell align="center">
                    <Link to={`/dashboard/courses/viewPaket/${row.id}`}>
                      <Button variant="contained" color="primary" size="small" sx={{ mr: 1 }}><Eye size={20} /></Button>
                    </Link>
                    <Link to={`/dashboard/courses/editPaket/${row.id}`}>
                      <Button variant="contained" color="warning" size="small" sx={{ mr: 1 }}><Pencil size={20} /></Button>
                    </Link>
                    <Button variant="contained" color="error" size="small" onClick={() => handleDelete(row.id)}>
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

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Tambah Kategori Berita</DialogTitle>
        <DialogContent>
          <DialogContentText>Masukkan nama kategori.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Kategori"
            type="text"
            fullWidth
            value={nameCategory}
            onChange={(e) => setNameCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Batal</Button>
          <Button onClick={handleSaveCategory} variant="contained" color="primary">Simpan</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CategoryContent;