import React, { useMemo } from 'react';
import type { User, AttendanceData } from '../types';
import { useTheme } from '../context/ThemeContext';

interface DashboardProps {
  user: User;
  attendance: AttendanceData;
  onAttendance: (type: 'in' | 'out') => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, attendance, onAttendance, onLogout }) => {
  const { isDark, toggleTheme } = useTheme();
  const today = new Date().toISOString().split('T')[0];
  const todayRecord = attendance[today];
  
  const stats = useMemo(() => {
    const dates = Object.keys(attendance);
    const daysPresent = dates.length;
    const lastEntry = dates.length > 0 ? attendance[dates[dates.length - 1]] : null;
    
    return { daysPresent, lastEntry };
  }, [attendance]);

  const isClockInDisabled = todayRecord?.clockIn !== null;
  const isClockOutDisabled = !todayRecord?.clockIn || todayRecord?.clockOut !== null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-md mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-2xl font-bold text-black dark:text-white">{user.name}</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{user.id}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={toggleTheme}
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition text-lg"
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <button
              onClick={onLogout}
              className="text-gray-600 dark:text-gray-400 text-sm hover:text-black dark:hover:text-white transition"
            >
              Keluar
            </button>
          </div>
        </div>

        {/* Today's Status */}
        <div className="bg-gray-50 dark:bg-gray-800 p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Status Hari Ini</p>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Masuk</p>
              <p className="text-lg font-bold text-black dark:text-white">{todayRecord?.clockIn || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Keluar</p>
              <p className="text-lg font-bold text-black dark:text-white">{todayRecord?.clockOut || '-'}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {new Date(today + 'T00:00:00').toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Action Buttons */}
        <button
          onClick={() => onAttendance('in')}
          disabled={isClockInDisabled}
          className="w-full bg-black dark:bg-white text-white dark:text-black py-4 text-lg font-medium hover:bg-gray-900 dark:hover:bg-gray-100 transition disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed mb-3"
        >
          {isClockInDisabled ? 'Sudah Absen Masuk' : 'Absen Masuk'}
        </button>

        <button
          onClick={() => onAttendance('out')}
          disabled={isClockOutDisabled}
          className="w-full bg-gray-800 dark:bg-gray-700 text-white py-4 text-lg font-medium hover:bg-gray-700 dark:hover:bg-gray-600 transition disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {isClockOutDisabled ? 'Tidak Bisa Absen Keluar' : 'Absen Keluar'}
        </button>

        {/* Stats */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-black dark:text-white mb-4">Ringkasan</p>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Total Hari Masuk</span>
              <span className="font-bold text-black dark:text-white">{stats.daysPresent} hari</span>
            </div>
            {stats.lastEntry && (
              <div className="text-xs text-gray-500 dark:text-gray-500">
                <p>Terakhir: {stats.lastEntry.date}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
