import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import Ratings from "./Ratings";
// BookCard component to display individual book details
function BookCard({ book, onView, liked, onToggleLike, onToggleLibrary, inLibrary }) {
  // Auth context to check user authentication
  const { currentUser } = useAuth(); 
  const navigate = useNavigate(); // for navigation
  const [showPrompt, setShowPrompt] = useState(false); // state to control login prompt modal
  const [viewed, setViewed] = useState(false); // state to track if book has been viewed

  const { title, authors = [], download_count, formats } = book; // Destructure book details
  const authorNames = authors.map((a) => a.name).join(", ") || "Unknown Author"; // Get author names
  const cover = formats["image/jpeg"] || formats["image/png"] || null;
// Handler for like button click
  const handleToggleLike = (e) => {
    e.stopPropagation(); // prevent card click

    if (!currentUser) { 

      setShowPrompt(true);

      return;
    }
    onToggleLike(book);
  };
// Handler for add to library button click
  const handleAddToLibrary = (e) => {

    e.stopPropagation();

    if (!currentUser) {

      setShowPrompt(true);
      return; // exit if not logged in
    }
    onToggleLibrary(book);
  };
// Render BookCard component
  return (
    <div className="bg-white
    dark:bg-gray-800 
    shadow-sm
     hover:shadow-lg 
     transition rounded-lg 
     overflow-hidden 
     flex flex-col">
      <div className="relative">
        {cover ? (
          <img src={cover} alt={title} className="w-full 
          h-44 object-cover" />
        ) : (
          <div className="w-full 
          h-44 bg-gray-200 
          dark:bg-gray-700 
          flex items-center 
          justify-center 
          text-gray-500">
            No cover
          </div>
        )}

        <button
          onClick={handleToggleLike}
          aria-label="Like book"
          className="absolute top-2 
          right-2 
          p-2 rounded-full 
          bg-white 
          dark:bg-gray-900 
          shadow hover:scale-105 transform transition"
        >
          {liked ? (
            <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21s-7.2-4.3-9.3-6.3C.8 11.9 2.3 6.3 6 4.5 8.1 3.5 10.6 4 12 6c1.4-2 3.9-2.5 6-1.5 3.7 1.8 5.2 7.4 3.3 10.2C19.2 16.7 12 21 12 21z" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-gray-600 dark:text-gray-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              
              <path
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.8 7.3a5.7 5.7 0 00-8-.6L12 7 11.2 6.7a5.7 5.7 0 00-8 .6 5.4 5.4 0 00-.6 7.1C4 17 12 22 12 22s8-5 9.4-7a5.4 5.4 0 00-.6-7.1z"
              ></path>
            </svg>
          )}
        </button>
      </div>

      <div className="book-card">

        <Ratings />
      </div>

      <div className="p-4 flex-1 flex flex-col">

        <h3 className="font-semibold text-md mb-1 line-clamp-2">{title}</h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          {authorNames}
        </p>

        <div className="mt-auto flex items-center justify-between">

          <div className="text-xs text-gray-500 dark:text-gray-400">
            Downloads: {download_count}
          </div>
          
          <div className="flex gap-2">
            {/* View button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onView(book);
                setViewed(true); //  Mark book as viewed
              }}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
            >
              View
            </button>

        
          </div>
        </div>
      </div>

      {/* Login Prompt Modal */}
      {showPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 text-center w-80">
            <h2 className="text-lg font-semibold mb-2">Login Required</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Please log in to add books to your library.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Log In
              </button>
              <button
                onClick={() => setShowPrompt(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookCard;