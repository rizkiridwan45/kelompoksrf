import React, { useState, useEffect } from 'react';
import Layout from './layout/Layouts';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { FaUsers, FaChartBar } from 'react-icons/fa';

function Dashboard({ onLogout }) {
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

        // Hitung jumlah mahasiswa per kelas
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
    datasets: [
      {
        label: 'Jumlah Mahasiswa per Kelas',
        data: Object.values(kelasData),
        backgroundColor: [
          '#FFE066',  // kuning
          '#FF6B6B',  // pink
          '#9E9E9E',  // abu-abu
        ],
        borderColor: [
          '#FFD700',  // kuning
          '#FF4757',  // pink  
          '#9E9E9E',  // abu-abu
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribusi Mahasiswa per Kelas'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    },
    elements: {
      bar: {
        backgroundColor: [
          '#FFE066',  // kuning
          '#FF6B6B',  // pink
          '#9E9E9E',  // abu-abu
        ]
      }
    }
  };

  return (
    <Layout onLogout={onLogout}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        {loading ? (
          <div className="text-center">Memuat data...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-center mb-4">
                  <FaUsers className="text-blue-500 text-4xl" />
                </div>
                <h2 className="text-xl font-semibold text-center mb-2">Total Mahasiswa</h2>
                <p className="text-3xl font-bold text-center">{mahasiswaCount}</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-center mb-4">
                  <FaChartBar className="text-green-500 text-4xl" />
                </div>
                <h2 className="text-xl font-semibold text-center mb-2">Jumlah Kelas</h2>
                <p className="text-3xl font-bold text-center">{Object.keys(kelasData).length}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Dashboard;