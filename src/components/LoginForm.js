import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserAlt, FaLock } from 'react-icons/fa';

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');
        const storedRememberMe = localStorage.getItem('rememberMe') === 'true';
        if (storedRememberMe) {
            setEmail(storedEmail || '');
            setPassword(storedPassword || '');
            setRememberMe(true);
        }
    }, []);

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:4001/api/auth/login', {
                email,
                password,
            });
            const token = response.data.token;
            localStorage.setItem('authToken', token);

            if (rememberMe) {
                localStorage.setItem('email', email);
                localStorage.setItem('password', password);
                localStorage.setItem('rememberMe', 'true');
            } else {
                localStorage.removeItem('email');
                localStorage.removeItem('password');
                localStorage.setItem('rememberMe', 'false');
            }

            alert('Login berhasil!');
            onLogin();
        } catch (error) {
            setMsg(error.response ? error.response.data.message : 'Terjadi kesalahan saat login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="hero is-fullheight bg-gradient-to-br from-blue-800 to-purple-600">
            <div className="hero-body">
                <div className="container max-w-md mx-auto">
                    <div className="columns is-centered">
                        <div className="column is-12">
                            <form className="box p-8 rounded-xl shadow-2xl bg-white space-y-6" onSubmit={handleAuth}>
                                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>
                                {msg && <p className="text-red-500 text-center mb-4">{msg}</p>}
                                {loading && (
                                    <div className="flex justify-center mb-4">
                                        <svg aria-hidden="true" className="w-6 h-6 text-blue-500 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.4858 100.591 0 78.2051 0 50.5908C0 22.9766 22.4858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 74.1895 27.4014 91.5094 50 91.5094C72.5987 91.5094 90.9186 74.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4014 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M94.9676 49.0409C96.494 48.4048 97.8624 45.9116 97.0079 44.5549C95.2942 28.8227 92.871 24.4692 89.8167 20.448C85.8452 15.1192 80.8826 10.7248 75.2124 7.41289C69.5422 4.10194 64.2754 1.94025 56.7698 1.05124C51.7666 0.467541 46.6976 0.446844 41.7445 1.27874C49.2614 1.69428 47.814 4.19778 48.4501 6.62426C49.0874 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6441 15.2552C75.2745 17.9648 79.4447 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 42.2914 88.1811 45.8758C89.084 48.2158 91.5421 49.6781 94.9676 49.0409Z" fill="currentFill"/>
                                        </svg>
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <label className="block text-gray-700 font-medium mb-1">Email</label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Masukkan email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <span className="absolute left-3 top-2.5 text-gray-500">
                                            <FaUserAlt />
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-gray-700 font-medium mb-1">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Masukkan password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <span className="absolute left-3 top-2.5 text-gray-500">
                                            <FaLock />
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-2 text-sm text-blue-600 hover:text-blue-800"
                                        >
                                            {showPassword ? 'Sembunyikan' : 'Tampilkan'}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                        checked={rememberMe}
                                        onChange={() => setRememberMe(!rememberMe)}
                                    />
                                    <label htmlFor="remember" className="ml-2 text-gray-700">Ingat saya</label>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
                                >
                                    Masuk
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginForm;
