import React, { useState } from 'react';
import type { ClassData } from '../types';

interface AdminSetupProps {
  onSetup: (data: ClassData) => void;
}

const AdminSetup: React.FC<AdminSetupProps> = ({ onSetup }) => {
  const [total, setTotal] = useState('');
  const [names, setNames] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const totalNum = parseInt(total);
    const nameList = names
      .split('\n')
      .map((n) => n.trim())
      .filter((n) => n);

    if (totalNum <= 0) {
      setError('Jumlah siswa harus lebih dari 0');
      return;
    }

    if (nameList.length !== totalNum) {
      setError(`Harap masukkan ${totalNum} nama siswa`);
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const students = nameList.map((name, idx) => ({
      id: `student_${idx + 1}`,
      name,
      isPresent: false,
    }));

    onSetup({
      date: today,
      totalStudents: totalNum,
      students,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 px-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-green-700 dark:text-green-400">
          Absensi Kelas
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 text-sm">
          Setup daftar siswa
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
              Jumlah Siswa
            </label>
            <input
              type="number"
              min="1"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              placeholder="Contoh: 32"
              className="w-full px-4 py-3 border border-green-300 dark:border-green-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-green-600 dark:focus:border-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
              Daftar Nama Siswa (1 baris = 1 siswa)
            </label>
            <textarea
              value={names}
              onChange={(e) => setNames(e.target.value)}
              placeholder="Andi&#10;Budi&#10;Citra&#10;..."
              rows={8}
              className="w-full px-4 py-3 border border-green-300 dark:border-green-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-green-600 dark:focus:border-green-400 resize-none"
            />
          </div>

          {error && (
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white py-3 font-medium transition"
          >
            Mulai Absensi
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSetup;
