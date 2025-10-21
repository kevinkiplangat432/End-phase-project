import React from "react";

function BookCard({ book }) {
  const { title, authors, download_count, formats } = book;
  const authorNames = authors.map((a) => a.name).join(", ");

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex flex-col">
      <h2 className="font-bold text-lg mb-1">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-2">{authorNames || "Unknown Author"}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        Downloads: {download_count}
      </p>
      {formats["image/jpeg"] && (
        <img
          src={formats["image/jpeg"]}
          alt={title}
          className="w-full h-48 object-cover rounded"
        />
      )}
    </div>
  );
}

export default BookCard;
