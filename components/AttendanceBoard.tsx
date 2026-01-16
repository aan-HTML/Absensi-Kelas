import React, { useMemo } from 'react';
import type { ClassData, Student } from '../types';
import { useTheme } from '../context/ThemeContext';

interface AttendanceBoardProps {
  classData: ClassData;
  onUpdateAttendance: (data: ClassData) => void;
  onReset: () => void;
}

const AttendanceBoard: React.FC<AttendanceBoardProps> = ({
  classData,
  onUpdateAttendance,
  onReset,
}) => {
  const { isDark, toggleTheme } = useTheme();

  const stats = useMemo(() => {
    const present = classData.students.filter((s) => s.isPresent).length;
    const absent = classData.totalStudents - present;
    return { present, absent };
  }, [classData]);

  const absentStudents = useMemo(() => {
    return classData.students.filter((s) => !s.isPresent);
  }, [classData]);

  const handleToggleAttendance = (studentId: string) => {
    const updated = {
      ...classData,
      students: classData.students.map((s) => {
        if (s.id === studentId) {
          const currentTime = new Date().toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
          });
          return {
            ...s,
            isPresent: !s.isPresent,
            timestamp: !s.isPresent ? currentTime : undefined,
          };
        }
        return s;
      }),
    };
    onUpdateAttendance(updated);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-2">
              Absensi Kelas
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {new Date(classData.date + 'T00:00:00').toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={toggleTheme}
              className="text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 transition text-lg"
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <button
              onClick={onReset}
              className="text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 text-sm transition"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 p-4 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">Total Siswa</p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-400">
              {classData.totalStudents}
            </p>
          </div>
          <div className="bg-green-100 dark:bg-green-800 border border-green-300 dark:border-green-600 p-4 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">Hadir</p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-400">
              {stats.present}
            </p>
          </div>
          <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 p-4 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">Belum Absen</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              {stats.absent}
            </p>
          </div>
        </div>

        {/* Absent Alert */}
        {stats.absent > 0 && (
          <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-600 p-4 mb-8">
            <p className="text-red-800 dark:text-red-200 font-medium text-sm">
              ⚠️ {stats.absent} siswa belum absen:
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {absentStudents.map((s) => (
                <span
                  key={s.id}
                  className="text-xs bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-100 px-2 py-1 rounded"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Student List */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-4">
            Daftar Siswa
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {classData.students.map((student) => (
              <button
                key={student.id}
                onClick={() => handleToggleAttendance(student.id)}
                className={`p-4 text-left transition border-2 ${
                  student.isPresent
                    ? 'bg-green-50 dark:bg-green-900 border-green-300 dark:border-green-600'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {student.name}
                    </p>
                    {student.isPresent && student.timestamp && (
                      <p className="text-xs text-green-700 dark:text-green-400 mt-1">
                        ✓ {student.timestamp}
                      </p>
                    )}
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      student.isPresent
                        ? 'bg-green-500 border-green-600'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {student.isPresent && (
                      <span className="text-white text-sm">✓</span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
            Progress Absensi
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
            <div
              className="bg-green-500 h-full transition-all"
              style={{
                width: `${(stats.present / classData.totalStudents) * 100}%`,
              }}
            />
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
            {Math.round((stats.present / classData.totalStudents) * 100)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default AttendanceBoard;
