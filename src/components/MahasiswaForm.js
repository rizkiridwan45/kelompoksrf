import React, { useState, useEffect } from 'react'; // Import React and hooks
import axios from 'axios'; // Import axios for HTTP requests
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons from react-icons
// Import komponen layout
import Header from './layout/Header';
import Footer from './layout/Footer';
import Sidebar from './layout/Sidebar';

const MahasiswaForm = () => {
    const [mahasiswa, setMahasiswa] = useState([]); // State for mahasiswa
    const [name, setName] = useState(''); // State for name
    const [className, setClassName] = useState(''); // State for class
    const [npm, setNpm] = useState(''); // State for npm
    const [editingId, setEditingId] = useState(null); // State for editing mahasiswa ID
    const [error, setError] = useState(''); // State for error messages
    const [loading, setLoading] = useState(false); // State for loading status

    // Fetch mahasiswa on component mount
    useEffect(() => {
        fetchMahasiswa();
    }, []);

    // Fetch all mahasiswa
    const fetchMahasiswa = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get('http://localhost:4001/api/mahasiswa', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data); // Log the response data
            setMahasiswa(response.data.mahasiswas || []); // Update to use 'mahasiswas'
        } catch (error) {
            console.error('Error fetching mahasiswa:', error);
            setError('Gagal mengambil data mahasiswa');
        } finally {
            setLoading(false);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const token = localStorage.getItem('authToken');
            if (editingId) {
                // Update mahasiswa
                await axios.put(`http://localhost:4001/api/mahasiswa/${editingId}`, {
                    name,
                    class: className,
                    npm
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                alert('Data mahasiswa berhasil diperbarui!');
            } else {
                // Add new mahasiswa
                await axios.post('http://localhost:4001/api/mahasiswa', {
                    npm,
                    name,
                    class: className,
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                alert('Data mahasiswa berhasil ditambahkan!');
            }
            fetchMahasiswa();
            resetForm();
        } catch (error) {
            console.error('Error saving mahasiswa:', error);
            setError('Gagal menyimpan data mahasiswa');
        } finally {
            setLoading(false);
        }
    };

    // Reset form fields
    const resetForm = () => {
        setName('');
        setClassName('');
        setNpm('');
        setEditingId(null);
    };

    // Delete mahasiswa
    const deleteMahasiswa = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this mahasiswa?');
        if (confirmDelete) {
            setLoading(true);
            try {
                const token = localStorage.getItem('authToken');
                await axios.delete(`http://localhost:4001/api/mahasiswa/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                alert('Data mahasiswa berhasil dihapus!');
                fetchMahasiswa(); // Refresh the mahasiswa list
            } catch (error) {
                console.error('Error deleting mahasiswa:', error);
                setError('Gagal menghapus data mahasiswa');
            } finally {
                setLoading(false);
            }
        }
    };

    // Tambahkan fungsi handleLogout
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header onLogout={handleLogout} />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 bg-gray-100">
                    <div className="p-4">
                        {/* Konten MahasiswaForm yang sudah ada */}
                        <h1 className="text-2xl font-bold mb-6 text-gray-800">Format Data Mahasiswa</h1>
                        
                        {/* Form untuk Menambah/Edit Mahasiswa */}
                        <form onSubmit={handleSubmit} className="mb-4">
                            <input
                                type="text"
                                placeholder="NPM"
                                value={npm}
                                onChange={(e) => setNpm(e.target.value)} // Handle NPM input change
                                className="w-full p-2 border border-gray-300 rounded mb-2"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Nama"
                                value={name}
                                onChange={(e) => setName(e.target.value)} // Handle name input change
                                className="w-full p-2 border border-gray-300 rounded mb-2"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Kelas"
                                value={className}
                                onChange={(e) => setClassName(e.target.value)} // Handle class input change
                                className="w-full p-2 border border-gray-300 rounded mb-2"
                                required
                            />
                            <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
                                {editingId ? 'Perbarui' : 'Tambah'}
                            </button>
                            <button type="button" onClick={resetForm} className="bg-red-500 text-white rounded px-4 py-2 ml-2">
                                Batal
                            </button>
                        </form>

                        {/* Judul untuk tabel */}
                        <h2 className="text-xl font-bold mb-4">Data Mahasiswa</h2>
                        
                        {/* Tabel Mahasiswa */}
                        <table className="min-w-full border-collapse border border-gray-300 mb-4">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 p-2 bg-yellow-200 text-center">NPM</th>
                                    <th className="border border-gray-300 p-2 bg-yellow-200 text-center">Nama</th>
                                    <th className="border border-gray-300 p-2 bg-yellow-200 text-center">Kelas</th>
                                    <th className="border border-gray-300 p-2 bg-yellow-200 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mahasiswa.length > 0 ? (
                                    mahasiswa.map(mhs => (
                                        <tr key={mhs.id} className="bg-gray-100 hover:bg-gray-200">
                                            <td className="border border-gray-300 p-2 text-center">{mhs.npm}</td>
                                            <td className="border border-gray-300 p-2 text-center">{mhs.name}</td>
                                            <td className="border border-gray-300 p-2 text-center">{mhs.class}</td>
                                            <td className="border border-gray-300 p-2 text-center">
                                                <button onClick={() => {
                                                    setEditingId(mhs.id);
                                                    setName(mhs.name);
                                                    setClassName(mhs.class);
                                                    setNpm(mhs.npm);
                                                }} className="text-blue-500 transform transition-transform hover:scale-110">
                                                    <FaEdit className="inline mr-1" /> Edit
                                                </button>
                                                <button onClick={() => deleteMahasiswa(mhs.id)} className="text-red-500 ml-2 transform transition-transform hover:scale-110">
                                                    <FaTrash className="inline mr-1" /> Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="bg-gray-100">
                                        <td colSpan="4" className="text-center">Tidak ada mahasiswa ditemukan.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {loading && <p>Loading mahasiswa...</p>} {/* Display loading message */}
                        {error && <p className="text-red-500">{error}</p>} {/* Display error message if it exists */}
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default MahasiswaForm;