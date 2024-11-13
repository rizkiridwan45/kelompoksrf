import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

function LoginPage({ onLogin }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-orange-500">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <LoginForm onLogin={onLogin} />
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Belum punya akun?{' '}
            <Link to="/register" className="text-blue-500 hover:text-blue-700">
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
