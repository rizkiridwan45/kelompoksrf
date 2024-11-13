import React from 'react';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

function LogoutButton({ onLogout }) {
  return (
    <button 
      onClick={onLogout} 
      className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
      Keluar
    </button>
  );
}

export default LogoutButton;
