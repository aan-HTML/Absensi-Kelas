import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-10 h-10 border-2 border-gray-300 dark:border-gray-600 border-t-black dark:border-t-white rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">Loading...</p>
    </div>
  );
};

export default Spinner;
