import React, { useState, useEffect, useCallback } from 'react';
import type { ClassSession } from './types';
import { ThemeProvider } from './context/ThemeContext';
import AdminSetup from './components/AdminSetup';
import AttendanceBoard from './components/AttendanceBoard';
import Spinner from './components/common/Spinner';

const AppContent: React.FC = () => {
  const [classSession, setClassSession] = useState<ClassSession>({});
  const [isAdmin, setIsAdmin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('class_session');
      if (stored) {
        setClassSession(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to parse class session", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveClassSession = useCallback((data: ClassSession) => {
    setClassSession(data);
    localStorage.setItem('class_session', JSON.stringify(data));
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <Spinner />
      </div>
    );
  }

  const today = new Date().toISOString().split('T')[0];
  const hasSession = classSession[today];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {!hasSession ? (
        <AdminSetup 
          onSetup={(data) => {
            saveClassSession({ ...classSession, [today]: data });
            setIsAdmin(false);
          }}
        />
      ) : (
        <AttendanceBoard 
          classData={classSession[today]}
          onUpdateAttendance={(updated) => {
            saveClassSession({
              ...classSession,
              [today]: updated
            });
          }}
          onReset={() => {
            const newSession = { ...classSession };
            delete newSession[today];
            saveClassSession(newSession);
          }}
        />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;