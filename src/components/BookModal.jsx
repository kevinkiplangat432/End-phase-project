import React, { useEffect, useRef } from "react";
// BookModal component for displaying detailed book information
function BookModal({ book, onClose, onRead, inLibrary, onToggleLibrary }) {
  const overlayRef = useRef();
// Close modal on Escape key press
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  // Close modal when clicking outside the content
  const clickOutside = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!book) return null;
  // Destructure book details
  const cover = book.formats["image/jpeg"] || book.formats["image/png"] || null;
  const authors = book.authors?.map((a) => a.name).join(", ") || "Unknown";

  return (
    <div
      ref={overlayRef}
      onClick={clickOutside}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-xl shadow-2xl max-w-3xl w-full overflow-auto">
        <div className="flex items-start justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h2 className="text-xl font-bold">{book.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">By {authors}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Close"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1 flex items-center justify-center">
            {cover ? (
              <img src={cover} alt={book.title} className="w-40 h-56 object-cover rounded" />
            ) : (
              <div className="w-40 h-56 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded">No cover</div>
            )}
          </div>

          <div className="md:col-span-2">
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
              Languages: {book.languages?.join(", ") || "N/A"} • Downloads: {book.download_count}
            </p>

            <div className="mb-4">
              <p className="text-sm text-gray-700 dark:text-gray-200 line-clamp-6">
                {book.subjects?.slice(0, 6).join(", ") || "No description available."}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => onRead(book)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Read Book
              </button>

              <button
                onClick={() => onToggleLibrary(book)}
                className={px-4 py-2 rounded-md transition ${inLibrary ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'}}
              >
                {inLibrary ? "Remove from Library" : "Add to Library"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookModal;