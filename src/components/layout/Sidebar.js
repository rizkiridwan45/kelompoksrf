import React, { useState } from 'react';
import { FaHome, FaCog, FaBars, FaGraduationCap } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false); // Start closed

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar bg-blue-600 text-white h-screen transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} overflow-hidden`}>
            <button onClick={toggleSidebar} className="toggle-btn p-4 w-full flex justify-end">
                <FaBars className="text-2xl" />
            </button>
            {isOpen && (
                <div className="sidebar-content">
                    <h2 className="text-2xl font-bold mb-6 px-4">Menu</h2>
                    <ul className="space-y-4">
                        <li className="hover:bg-blue-700 transition-colors duration-200">
                            <Link to="/dashboard" className="flex items-center p-4 w-full text-left">
                                <FaHome className="mr-4" />
                                <span>Beranda</span>
                            </Link>
                        </li>
                        
                        <li className="hover:bg-blue-700 transition-colors duration-200">
                            <Link to="/settings" className="flex items-center p-4 w-full text-left">
                                <FaCog className="mr-4" />
                                <span>Pengaturan</span>
                            </Link>
                        </li>
                        <li className="hover:bg-blue-700 transition-colors duration-200">
                            <Link to="/mahasiswa" className="flex items-center p-4 w-full text-left">
                                <FaGraduationCap className="mr-4" />
                                <span>Data Mahasiswa</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Sidebar;