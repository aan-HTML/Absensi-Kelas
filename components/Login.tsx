import React, { useState } from 'react';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <div className="w-full max-w-sm px-6">
        <h1 className="text-2xl font-bold text-center mb-8 text-black dark:text-white">Absensi</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nama Anda"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white text-sm focus:outline-none focus:border-black dark:focus:border-white"
            autoFocus
          />
          <button
            type="submit"
            className="w-full bg-black dark:bg-white text-white dark:text-black py-3 text-sm font-medium hover:bg-gray-900 dark:hover:bg-gray-100 transition"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
