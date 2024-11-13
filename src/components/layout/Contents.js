import React, { useState, useEffect } from 'react';
import { FaUsers, FaChartBar, FaCalendar, FaTasks } from 'react-icons/fa';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function Content() {
    const [mahasiswaCount, setMahasiswaCount] = useState(0);
    const [kelasData, setKelasData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:4001/api/mahasiswa', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const mahasiswas = response.data.mahasiswas || [];
                setMahasiswaCount(mahasiswas.length);

                const kelasCount = mahasiswas.reduce((acc, curr) => {
                    acc[curr.class] = (acc[curr.class] || 0) + 1;
                    return acc;
                }, {});

                setKelasData(kelasCount);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const chartData = {
        labels: Object.keys(kelasData),
        datasets: [{
            label: 'Jumlah Mahasiswa per Kelas',
            data: Object.values(kelasData),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        }],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Distribusi Mahasiswa per Kelas'
            }
        }
    };

    return (
        <div className="container mx-auto mt-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            {loading ? (
                <div className="text-center">Memuat data...</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <FaUsers className="text-blue-500 text-4xl mb-4 mx-auto" />
                            <h2 className="text-xl font-semibold mb-2">Total Mahasiswa</h2>
                            <p className="text-3xl font-bold">{mahasiswaCount}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <FaChartBar className="text-green-500 text-4xl mb-4 mx-auto" />
                            <h2 className="text-xl font-semibold mb-2">Jumlah Kelas</h2>
                            <p className="text-3xl font-bold">{Object.keys(kelasData).length}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <FaCalendar className="text-yellow-500 text-4xl mb-4 mx-auto" />
                            <h2 className="text-xl font-semibold mb-2">Acara</h2>
                            <p className="text-3xl font-bold">12</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <FaTasks className="text-red-500 text-4xl mb-4 mx-auto" />
                            <h2 className="text-xl font-semibold mb-2">Tugas</h2>
                            <p className="text-3xl font-bold">25</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4 mt-6">
                        <div style={{ height: '300px' }}>
                            <Bar data={chartData} options={chartOptions} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Content;
