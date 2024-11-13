import React from 'react';
import LogoutButton from '../LogoutBottom';


function Header({ onLogout }) {
    return (
        <header className="flex justify-between items-center bg-blue-500 text-white p-4">
            <h1 className="text-xl font-bold">Universitas Bumi</h1>
            <div className="flex items-center">
                <LogoutButton onLogout={onLogout} />
            </div>
        </header>
    );
}

export default Header;