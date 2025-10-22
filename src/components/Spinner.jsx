import React from "react";

function Spinner() {
  return (
    <div className="flex items-center justify-center w-full py-8">
      <div className="w-12 h-12 border-4 border-gray-300 dark:border-gray-700 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
}

export default Spinner;
