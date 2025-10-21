import React from "react";

function Library() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <h1 className="text-4xl font-bold mb-4">📖 My Library</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        Here you’ll find all the books you’ve liked or saved for later.
      </p>
    </main>
  );
}

export default Library;
