import React, { useState, useMemo } from "react";
import BookCard from "./BookCard";
import Filter from "./Filter";
import SearchBar from "./SearchBar";
import Reader from "./Reader";

function BookList({ books }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("all");
  const [sortOption, setSortOption] = useState("default");

  // 🔍 Filter + Sort logic (same as before)
  const filteredBooks = useMemo(() => {
    let filtered = books;

    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(lower) ||
          book.authors?.some((a) => a.name.toLowerCase().includes(lower))
      );
    }

    if (language !== "all") {
      filtered = filtered.filter((book) => book.languages.includes(language));
    }

    if (sortOption === "downloads") {
      filtered = [...filtered].sort((a, b) => b.download_count - a.download_count);
    } else if (sortOption === "title") {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [books, searchQuery, language, sortOption]);

  // 🧱 If a book is selected → open reader
  if (selectedBook) {
    return <Reader book={selectedBook} onClose={() => setSelectedBook(null)} />;
  }

  return (
    <div>
      {/* Filter controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <Filter
          language={language}
          onLanguageChange={setLanguage}
          sortOption={sortOption}
          onSortChange={setSortOption}
        />
      </div>

      {/* Grid of books */}
      {filteredBooks.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
          No books found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div key={book.id} onClick={() => setSelectedBook(book)} className="cursor-pointer">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;
