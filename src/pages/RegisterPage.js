import React from 'react';
import RegisterForm from '../components/RegisterForm';

function RegisterPage({ onRegister }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-orange-500">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <RegisterForm onRegister={onRegister} />
      </div>
    </div>
  );
}

export default RegisterPage;
