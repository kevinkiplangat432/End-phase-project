import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import BookList from "../components/BookList";

function Library() {
  const [libraryBooks, setLibraryBooks] = useLocalStorage("libraryBooks", []);
  const [likedBooks, setLikedBooks] = useLocalStorage("likedBooks", []);

  const toggleLibrary = (book) => {
    setLibraryBooks((prev) => {
      const exists = prev.find((b) => b.id === book.id);
      if (exists) return prev.filter((b) => b.id !== book.id);
      return [book, ...prev];
    });
  };

  const toggleLike = (book) => {
    setLikedBooks((prev) => {
      const exists = prev.find((b) => b.id === book.id);
      if (exists) return prev.filter((b) => b.id !== book.id);
      return [book, ...prev];
    });
  };

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-3">📚 My Library</h1>
      

        {libraryBooks.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">Your library is empty. Add books from Home.</p>
        ) : (
          <BookList
            books={libraryBooks}
            likedBooks={likedBooks}
            toggleLike={toggleLike}
            libraryBooks={libraryBooks}
            toggleLibrary={toggleLibrary}
          />
        )}
      </div>
    </main>
  );
}

export default Library;